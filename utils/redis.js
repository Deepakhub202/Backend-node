const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

const storeUserData = async (email, userData) => {
    await client.setex(`signup:${email}`, 300, JSON.stringify(userData)); 

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
