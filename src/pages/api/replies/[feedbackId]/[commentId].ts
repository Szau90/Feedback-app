import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { Replies } from "@/models/feedback";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const feedbackId = req.query.feedbackId;
  const commentId = req.query.commentId;

  const reply: Replies[] = req.body;

  const method = req.method;

  switch (method) {
    case "POST":
      try {
        const client = await MongoClient.connect(
          process.env.NEXT_PUBLIC_MONGODB_URI!
        );

        const db = client.db();

        if (typeof feedbackId === "string" && typeof commentId === "string") {
          const parsedFeedbackId = parseInt(feedbackId);
          const parsedCommentId = parseInt(commentId);

          const result = await db
            .collection("product-requests")
            .findOneAndUpdate(
              {
                id: parsedFeedbackId,
                "comments.id": parsedCommentId,
              },
              { $push: { "comments.$.replies": reply } } as any
            );

          client.close();
          console.log(result);

          res.status(201).json(JSON.parse(JSON.stringify(reply)));
        }
      } catch (error) {
        console.log(error);
      }

      break;

    default:
      res.status(405).end(`${method} Not Allowed!`);
      break;
  }
}
