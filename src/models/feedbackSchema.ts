import { Schema, model, models } from "mongoose";
import Feedback from "./feedback";

const FeedbackSchema = new Schema({
    productRequests: {
        id: Number,
        title: String,
        category: String,
        upvotes:Number,
        status:String,
        description: String,
        comments: [
            {
                id:Number,
                content:String,
                user: {
                    image:String,
                    name: String,
                    username:String,
                },
                replies: [
                    {
                        content:String,
                        replyingTo:String,
                        user: {
                            image:String,
                            name:String,
                            username:String,
                        }
                    }
                ]
            }
        ]
       
    }
}
)

const productFeedback = models.feedback || model("feedback", FeedbackSchema);

export default productFeedback;