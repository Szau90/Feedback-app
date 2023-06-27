import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { feedbackId } = req.query;
    const user  = req.body;

    

    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_URI!,
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
        }

        
      
        if(!feedback.upvotedBy.includes(user.id)){
            await feedbackCollection.updateOne(
                { id: parsedFeedbackId },
                {
                  $inc: { upvotes: 1 },
                  $push: { upvotedBy: user.id },
                  $set: {isUpvoted: true},
                }
              );
        
              const updatedFeedback = await feedbackCollection.findOne({
                id: parsedFeedbackId,
              });
        
              res.status(200).json(updatedFeedback);
        }else {
          await feedbackCollection.updateOne(
            { id: parsedFeedbackId },
            {
              $inc: { upvotes: -1 },
              $pull: { upvotedBy: user.id },
              $set: {isUpvoted: false},
            }
          );
    
          const updatedFeedback = await feedbackCollection.findOne({
            id: parsedFeedbackId,
          });
    
          res.status(200).json(updatedFeedback);
        }
        
      } else {
        res.status(400).json({ error: "Invalid feedback ID" });
      }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}
