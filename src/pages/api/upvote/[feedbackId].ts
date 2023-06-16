import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import Feedback from "@/models/feedback";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { feedbackId } = req.query;
    const user  = req.body;

    console.log(user.id)

    const client = await MongoClient.connect(
      "mongodb+srv://Szau:FordMondeo12@cluster0.jfdopa9.mongodb.net/Product-feedback-app?retryWrites=true&w=majority"
    );
    const db = client.db("Product-feedback-app");

    if (typeof feedbackId === "string") {
        const parsedFeedbackId = parseInt(feedbackId);
  
        const feedbackCollection = db.collection("product-requests");
  
        const feedback = await feedbackCollection.findOne({
          id: parsedFeedbackId,
        });
  
        if (!feedback) {
          return res.status(404).json({ error: "Feedback not found" });
        }
  
        if (!feedback.upvotedBy) {
          feedback.upvotedBy = [];
        } else if (feedback.upvotedBy.includes(user.id)) {
          return res
            .status(400)
            .json({ error: "You have already upvoted this feedback" });
        }
        
        if(!feedback.upvotedBy.includes(user.id)){
            await feedbackCollection.updateOne(
                { id: parsedFeedbackId },
                {
                  $inc: { upvotes: 1 },
                  $push: { upvotedBy: user.id },
                }
              );
        
              const updatedFeedback = await feedbackCollection.findOne({
                id: parsedFeedbackId,
              });
        
              res.status(200).json(updatedFeedback);
        }else {
            return res.status(400).json({error:"You have already upvoted this feedback"})
        }
        
      } else {
        res.status(400).json({ error: "Invalid feedback ID" });
      }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}
