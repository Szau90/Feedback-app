import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import Feedback from "@/models/feedback";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const data:Feedback = req.body;
  switch (method) {
    case "GET":
      try {
        const client = await MongoClient.connect(
          "mongodb+srv://Szau:FordMondeo12@cluster0.jfdopa9.mongodb.net/Product-feedback-app?retryWrites=true&w=majority"
        );
        const db = client.db();

        const feedback = await db
          .collection("product-requests")
          .find({})
          .toArray();

          client.close();

        res.status(200).json(JSON.parse(JSON.stringify(feedback)));
      } catch (e) {
        console.error(e);
      }

      break;

    case "POST":
      try {
        const client = await MongoClient.connect(
          "mongodb+srv://Szau:FordMondeo12@cluster0.jfdopa9.mongodb.net/Product-feedback-app?retryWrites=true&w=majority"
        );

        const db = client.db();

        const result = await db
          .collection("product-requests")
          .insertOne( data );

        console.log(result);

        client.close();

        res.status(201).json({ message: "Feedback inserted" });
      } catch (error) {
        console.log(error);
      }

      break;

    default:
      res.status(405).end(`${method} Not Allowed`);
      break;
  }
}
