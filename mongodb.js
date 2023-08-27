require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');

const DB_URI = process.env.DB_URI;

const client = new MongoClient(DB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

    async function run() {
        try {
            await client.connect();
            await client.db("admin").command({ ping: 1 });
            console.log("Все чудово!");
        } catch (error) {
            console.error(error);
        } finally {
            await client.close();
    }
}

run().catch(console.dir);