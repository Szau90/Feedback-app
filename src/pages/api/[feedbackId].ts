import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import Feedback from "@/models/feedback";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Feedback>
) {
  const { feedbackId } = req.query;
  const method = req.method;
  const data = req.body;

  switch (method) {
    case "GET":
      try {
        const client = await MongoClient.connect(
          process.env.NEXT_PUBLIC_MONGODB_URI!
        );
        const db = client.db("Product-feedback-app");

        if (typeof feedbackId === "string") {
          const parsedFeedbackId = parseInt(feedbackId);

          const feedback = await db
            .collection("product-requests")
            .findOne({ id: parsedFeedbackId });

          res.status(200).json(JSON.parse(JSON.stringify(feedback)));
        }
      } catch (e) {
        console.error(e);
      }

      break;

    case "PUT":
      try {
        const client = await MongoClient.connect(
          process.env.NEXT_PUBLIC_MONGODB_URI!
        );

        const db = client.db("Product-feedback-app");

        if (typeof feedbackId === "string") {
          const parsedFeedbackId = parseInt(feedbackId);

          const feedback = await db
            .collection("product-requests")
            .findOneAndReplace(
              { id: parsedFeedbackId },
              {
                id: data.id,
                category: data.category,
                description: data.description,
                status: data.status,
                title: data.title,
                comments: data.comments,
                upvotes: data.upvotes,
                isUpvoted: data.isUpvoted,
                upvotedBy: data.upvotedBy,
              }
            );

          client.close();
          console.log(data);
          res.status(201).json(JSON.parse(JSON.stringify(feedback)));
        }
      } catch (error) {
        console.log(error);
      }
      break;

    case "DELETE":
      try {
        const client = await MongoClient.connect(
          process.env.NEXT_PUBLIC_MONGODB_URI!
        );

        const db = client.db("Product-feedback-app");

        if (typeof feedbackId === "string") {
          const parsedFeedbackId = parseInt(feedbackId);

          const feedback = await db
            .collection("product-requests")
            .findOneAndDelete({ id: parsedFeedbackId });

          client.close();

          res.status(201).json(JSON.parse(JSON.stringify(feedback)));
        }
      } catch (error) {
        console.log(error);
      }
      break;

    default:
      res.status(405).end(`${method} Not Allowed`);
      break;
  }
}
