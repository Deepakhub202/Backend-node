const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

client.connect().catch(() => {});

const storeUserData = async (email, userData) => {
    await client.setEx(`signup:${email}`, 300, JSON.stringify(userData));
};

const getStoredUserData = async (email) => {
    const data = await client.get(`signup:${email}`);
    return data ? JSON.parse(data) : null;
};

const deleteStoredUserData = async (email) => {
    await client.del(`signup:${email}`);
};

module.exports = {
    client,
    storeUserData,
    getStoredUserData,
    deleteStoredUserData
};
