import redis from "redis";

export const redisC = async (req,res) => {
    const redisClient = redis.createClient();
    redisClient.on("err", (err) => {
        res.status(404).send(err);
    });
    await redisClient.connect();
}