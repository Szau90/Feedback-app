import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { Comments } from "@/models/feedback";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const data: Comments = {
        _id: new ObjectId(),
        ...req.body,
      };
  const method = req.method;

  switch (method) {
    case "POST":
      try {
        const client = await MongoClient.connect(
          "mongodb+srv://Szau:FordMondeo12@cluster0.jfdopa9.mongodb.net/Product-feedback-app?retryWrites=true&w=majority"
        );

        const db = client.db()

        const result = await db.collection("product-requests").insertOne(data)

        console.log(result)

        client.close();

        res.status(201).json({message: 'comment inserted'})


      } catch (error) {
        console.log(error);
      }

      break;

    default:
        res.status(405).end(`${method} Not Allowed`);
      break;
  }
}
