import { strictEqual } from 'assert';
import { MongoClient } from 'mongodb';

const password = 'Tea123';
const url = `mongodb+srv://Simon:${password}@cluster0.n4iai.gcp.mongodb.net/test>?retryWrites=true&w=majority`;

MongoClient.connect(
  url,
  { useUnifiedTopology: true },
  async function (err, client) {
    strictEqual(null, err);
    console.log('Connected successfully to db');

    const db = client.db('test');
    const cursor = db.collection('games').find({});
    await cursor.forEach(console.dir);

    client.close();
  },
);
