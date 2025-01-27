const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ftrash793:j4DxcXePyAKdjH5u@cluster0.rgs83.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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


		db = client.db("Lab")

		db.createCollection("Fruit-test");
		console.log("Collection 'Fruit' created successfully!");

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

		console.log(p)

		const salesOnApril4th = await col.find({
			date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
		}).count();

		console.log(`${salesOnApril4th} sales occured in 2014.`)
		const data = col.aggregate([
			// Find all of the sales that occurred in 2014.
			{ $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
			// Group the total sales for each product.
			{ $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: ['$price', '$quantity'] } } } }
		]);

	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
run().catch(console.dir);
