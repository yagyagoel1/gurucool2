import redisClient from './redisClient.js';

class FlowDistributionAlgorithm {
    constructor() {
        this.totalConnectionsKey = 'totalConnections';
    }

    async initialize() {
        const totalConnections = await redisClient.get(this.totalConnectionsKey);
        this.totalConnections = totalConnections ? parseInt(totalConnections, 10) : 0;
    }

    async totalConnectionCount() {
        return this.totalConnections;
    }

    async addAstrologer(astrologer) {
        const astrologerKey = `astrologer:${astrologer._id}`;
        try {
            const existingAstrologer = await redisClient.hGetAll(astrologerKey);
            if (existingAstrologer && Object.keys(existingAstrologer).length !== 0) {
                return null;
            }

            await redisClient.hSet(astrologerKey, {
                id: String(astrologer._id),
                email: String(astrologer.email),
                isTopAstrologer: String(astrologer.isTopAstrologer),
                toggleAstrologer: String(astrologer.toggleAstrologer),
                currentConnections: String(astrologer.currentConnections || '0')
            });
            return astrologer;
        } catch (error) {
            console.error('Error adding astrologer:', error);
            return null;
        }
    }

    async removeAstrologer(astrologerId) {
        const astrologerKey = `astrologer:${astrologerId}`;
        const astrologer = await redisClient.hGetAll(astrologerKey);
        if (!astrologer || Object.keys(astrologer).length === 0) {
            return null;
        }

        await redisClient.del(astrologerKey);
        return astrologer;}

    async distributeUser(user) {
        const astrologerKeys = await redisClient.keys('astrologer:*');
        if (astrologerKeys.length === 0) {
            return null;
        }

        let astrologers = await Promise.all(astrologerKeys.map(key => redisClient.hGetAll(key)));
        astrologers = astrologers.map(astrologer => ({
            ...astrologer,
            currentConnections: parseInt(astrologer.currentConnections, 10),
        
        }));
        astrologers.sort((a, b) => a.currentConnections - b.currentConnections);
        const topAstrologers = astrologers.filter(a => a.isTopAstrologer==='true' && a.toggleAstrologer==='true');
        const regularAstrologers = astrologers.filter(a => !(a.isTopAstrologer==='true' && a.toggleAstrologer==='true'));
        const selectedAstrologer = topAstrologers.length && this.totalConnections % 2 === 0
            ? topAstrologers[0]
            : regularAstrologers[0];


        selectedAstrologer.currentConnections++;
        this.totalConnections++;

        const selectedAstrologerKey = `astrologer:${selectedAstrologer.id}`;
        await redisClient.hSet(selectedAstrologerKey, {
            ...selectedAstrologer,

            currentConnections: selectedAstrologer.currentConnections.toString()
        });
        await redisClient.set(this.totalConnectionsKey, this.totalConnections.toString());

        return selectedAstrologer.email;
    }
}

const flowDistributionAlgorithm = new FlowDistributionAlgorithm();
await flowDistributionAlgorithm.initialize(); // Initialize the algorithm

export default flowDistributionAlgorithm;
