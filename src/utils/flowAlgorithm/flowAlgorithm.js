
class FlowDistributionAlgorithm {
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
