import { describe, it, beforeEach, expect } from 'vitest';
import redisClient from '../__mocks__/redisClient.js';
import flowDistributionAlgorithm from '../src/utils/flowAlgorithm/flowAlgorithm.js';

describe('FlowDistributionAlgorithm', () => {
  beforeEach(async () => {
    await flowDistributionAlgorithm.initialize();
  });

  it('should add an astrologer', async () => {
    const astrologer = { _id: '1', email: 'astro1@example.com', isTopAstrologer: false, toggleAstrologer: true, currentConnections: 0 };
    const result = await flowDistributionAlgorithm.addAstrologer(astrologer);
    
    expect(result).not.toBeNull();
    const storedAstrologer = await redisClient.hGetAll('astrologer:1');
    expect(storedAstrologer).not.toBeNull();
    expect(storedAstrologer.email).toBe('astro1@example.com');
  });

  it('should not add an astrologer that already exists', async () => {
    const astrologer = { _id: '1', email: 'astro1@example.com', isTopAstrologer: false, toggleAstrologer: true, currentConnections: 0 };
    await flowDistributionAlgorithm.addAstrologer(astrologer);
    const result = await flowDistributionAlgorithm.addAstrologer(astrologer);

    expect(result).toBeNull();
  });

  it('should distribute a user to the least connected astrologer and prioritize the top astro', async () => {
    const astrologer1 = { _id: '1', email: 'astro1@example.com', isTopAstrologer: false, toggleAstrologer: true, currentConnections: 0 };
    const astrologer2 = { _id: '2', email: 'astro2@example.com', isTopAstrologer: true, toggleAstrologer: true, currentConnections: 0 };
    const astrologer3 = { _id: '3', email: 'astro3@example.com', isTopAstrologer: false, toggleAstrologer: true, currentConnections: 0 };

    await flowDistributionAlgorithm.addAstrologer(astrologer1);
    await flowDistributionAlgorithm.addAstrologer(astrologer2);
    await flowDistributionAlgorithm.addAstrologer(astrologer3);

    const assignedEmail = await flowDistributionAlgorithm.distributeUser({ _id: 'user1' });
    const assignedEmail2 = await flowDistributionAlgorithm.distributeUser({ _id: 'user2' });
    const assignedEmail3 = await flowDistributionAlgorithm.distributeUser({ _id: 'user3' });
    const assignedEmail4 = await flowDistributionAlgorithm.distributeUser({ _id: 'user4' });
    // Check if the correct astrologer is assigned based on the expected logic
    // Modify this expectation if the logic should be different
    expect(assignedEmail).toBe('astro2@example.com');
    expect(assignedEmail2).toBe('astro1@example.com');
    expect(assignedEmail3).toBe('astro2@example.com');
    expect(assignedEmail4).toBe('astro3@example.com');
  });

  it('should remove an astrologer', async () => {
    const astrologer = { _id: '1', email: 'astro1@example.com', isTopAstrologer: false, toggleAstrologer: true, currentConnections: 0 };
    await flowDistributionAlgorithm.addAstrologer(astrologer);

    await flowDistributionAlgorithm.removeAstrologer('1');

    const storedAstrologer = await redisClient.hGetAll('astrologer:1');
    expect(storedAstrologer).toBeNull();
  });
});
