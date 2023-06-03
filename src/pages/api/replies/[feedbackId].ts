import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { Replies } from "@/models/feedback";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const feedbackId = req.query.feedbackId;

  const commentId = 1

  const reply: Replies[] = req.body;

  const method = req.method;

  switch (method) {
    case "POST":
      try {
        const client = await MongoClient.connect(
          "mongodb+srv://Szau:FordMondeo12@cluster0.jfdopa9.mongodb.net/Product-feedback-app?retryWrites=true&w=majority"
        );

        const db = client.db();

        if (typeof feedbackId === "string") {
          const parsedFeedbackId = parseInt(feedbackId);

          const result = await db
            .collection("product-requests")
            .findOneAndUpdate({ id: parsedFeedbackId}, { $push: { "comments.$[elem].replies": reply } } as any,
            { arrayFilters: [{ "elem.id": commentId }] }
           );

           client.close()
            console.log(result)

            res.status(201).json(JSON.parse(JSON.stringify(reply)))
        }
      } catch (error) {
        console.log(error)
      }

      break;

    default:
        res.status(405).end(`${method} Not Allowed!`)
      break;
  }
}
