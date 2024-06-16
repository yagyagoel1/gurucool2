
/*class FlowDistributionAlgorithm {
    constructor() {
        this.astrologers = [];
        this.totalConnections = 0;
    }

    addAstrologer(astrologer) {
        if(this.astrologers.find(a => a.id === astrologer.id)) {
            throw new Error('Astrologer already exists');
        }
        this.astrologers.push(astrologer);

    }

    async distributeUser (user) {
        if (this.astrologers.length === 0) {
            throw new Error('No astrologers available');
        }

        // Sort astrologers by the number of current connections
        this.astrologers.sort((a, b) => a.currentConnections - b.currentConnections);

        // Adjust distribution for top astrologers
        const topAstrologers = this.astrologers.filter(a => a.isTopAstrologer&&a.toggleAstrologer);
        const regularAstrologers = this.astrologers.filter(a => !(a.isTopAstrologer&&a.toggleAstrologer));

        const selectedAstrologer = topAstrologers.length && this.totalConnections % 2 === 0
            ? topAstrologers[0]
            : regularAstrologers[0];

        selectedAstrologer.currentConnections++;
        this.totalConnections++;
        return selectedAstrologer;
    }
}

export default new FlowDistributionAlgorithm();
*/
import redisClient from './redisClient';

class FlowDistributionAlgorithm {
    constructor() {
        this.totalConnectionsKey = 'totalConnections';
    }

    async initialize() {
        const totalConnections = await redisClient.get(this.totalConnectionsKey);
        //check for the totalconnections
        this.totalConnections = totalConnections ? parseInt(totalConnections, 10) : 0;
    }
    async addAstrologer(astrologer) {
        const astrologerKey = `astrologer:${astrologer.id}`;

        const existingAstrologer = await redisClient.hGetAll(astrologerKey);
        if (existingAstrologer && Object.keys(existingAstrologer).length !== 0) {
            throw new Error('Astrologer already exists');
        }

        await redisClient.hSet(astrologerKey, {
            id: astrologer.id,
            email: astrologer.email,
            isTopAstrologer: astrologer.isTopAstrologer,
            toggleAstrologer: astrologer.toggleAstrologer,
            currentConnections: astrologer.currentConnections || 0,
        });
    }
    async removeAstrologer(astrologerId) {
        const astrologerKey = `astrologer:${astrologerId}`;
        const astrologer = await redisClient.hGetAll(astrologerKey);
        if (!astrologer || Object.keys(astrologer).length === 0) {
            throw new Error('Astrologer not found');
        }

        await redisClient.del(astrologerKey);
    }
    async distributeUser(user) {
        const astrologerKeys = await redisClient.keys('astrologer:*');
        if (astrologerKeys.length === 0) {
            throw new Error('No astrologers available');
        }

        let astrologers = await Promise.all(astrologerKeys.map(key => redisClient.hGetAll(key)));
        astrologers = astrologers.map(astrologer => ({
            ...astrologer,
            currentConnections: parseInt(astrologer.currentConnections, 10),
            isTopAstrologer: astrologer.isTopAstrologer === 'true',
            toggleAstrologer: astrologer.toggleAstrologer === 'true'
        }));

        // Sort astrologers by the number of current connections
        astrologers.sort((a, b) => a.currentConnections - b.currentConnections);

        //filter both oof the astrologers aside 
        const topAstrologers = astrologers.filter(a => a.isTopAstrologer && a.toggleAstrologer);
        const regularAstrologers = astrologers.filter(a => !(a.isTopAstrologer && a.toggleAstrologer));
        //distribute the user to the astrologer
        const selectedAstrologer = topAstrologers.length && this.totalConnections % 2 === 0
            ? topAstrologers[0]
            : regularAstrologers[0];

        selectedAstrologer.currentConnections++;
        this.totalConnections++;

        const selectedAstrologerKey = `astrologer:${selectedAstrologer.id}`;
        await redisClient.hSet(selectedAstrologerKey, 'currentConnections', selectedAstrologer.currentConnections);
        await redisClient.set(this.totalConnectionsKey, this.totalConnections);

        return selectedAstrologer;
    }
}

const flowDistributionAlgorithm = new FlowDistributionAlgorithm();
flowDistributionAlgorithm.initialize(); // Initialize the algorithm

export default flowDistributionAlgorithm;
