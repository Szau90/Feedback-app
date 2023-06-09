import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { Comments } from "@/models/feedback";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: Comments = req.body;

  const feedbackId = Array.isArray(req.query.feedbackId)
    ? req.query.feedbackId[0]
    : req.query.feedbackId;

  const method = req.method;

  switch (method) {
    
    case "GET":
      try {
        const client = await MongoClient.connect(
          "mongodb+srv://Szau:FordMondeo12@cluster0.jfdopa9.mongodb.net/Product-feedback-app?retryWrites=true&w=majority"
        );

        const db = client.db();

        if (typeof feedbackId === "string") {
          const parsedFeedbackId = parseInt(feedbackId);

          const result = await db
            .collection("product-requests")
            .findOne({id: parsedFeedbackId} )
            

      
          
          client.close();

          res.status(201).json(JSON.parse(JSON.stringify(result)));
        }
      } catch (error) {
        console.log(error);
      }

      break;
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
            .findOneAndUpdate({ id: parsedFeedbackId }, {
              $addToSet: { comments: data },
            } as any);

      

          client.close();


          res.status(201).json(JSON.parse(JSON.stringify(data)));
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
