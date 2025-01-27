# Lab Report 6

# MongoDB

We can connect to MongoDB using

```sql
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "<Your URL>";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});
async function run() {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection
		await client.db("admin").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");

	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
run().catch(console.dir);
```

We can connect to the mongodb and create a collection like this
```js
  const db = client.db("Lab");
  db.createCollection("Fruit-test");
```
![image](https://github.com/user-attachments/assets/f225a1a4-2adf-4c99-8e0e-3bfcf0dc48ce)

We can insert data using the `insertMany`

```js
		let col = db.collection("Fruit-test");
		const p = await col.insertMany([
			{ 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
			{ 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
			{ 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
			{ 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
			{ 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
			{ 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
			{ 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
			{ 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
		])
```

We get the result

![image](https://github.com/user-attachments/assets/c106d38c-d6dc-4b57-a38f-1ab6a7b6d10f)

and we get the data in mongodb

![image](https://github.com/user-attachments/assets/b29da711-3291-4dc2-b784-64562d4c4cfc).

We can search data
```js
		const salesOnApril4th = await col.find({
			date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
		}).count();

		console.log(`${salesOnApril4th} sales occured in 2014.`)
```

resulting in

![image](https://github.com/user-attachments/assets/45a55ff0-c75f-4eb1-a131-bbf43ef27e09).




