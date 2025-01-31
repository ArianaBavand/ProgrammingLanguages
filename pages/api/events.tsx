import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const mongoUri = process.env.MONGODB_URI as string;

	if (!mongoUri) {
		return res
			.status(500)
			.json({ error: "Database connection string is missing" });
	}

	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method Not Allowed" });
	}

	try {
		const client = await MongoClient.connect(mongoUri);
		const db = client.db();
		const eventsCollection = db.collection("events");
		const events = await eventsCollection.find({ isFeatured: true }).toArray();

		console.log("Fetched Events:", events);

		client.close();

		res.status(200).json(events);
	} catch (error) {
		console.error(
			"Error fetching data from MongoDB:",
			(error as Error).message
		);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
