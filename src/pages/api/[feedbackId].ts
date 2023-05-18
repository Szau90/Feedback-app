import { NextApiRequest, NextApiResponse } from "next";
import {MongoClient} from "mongodb";
import nextConnect from 'next-connect';
import { ObjectId } from "mongodb";
import Feedback from "@/models/feedback";





export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Feedback>
) {

const { feedbackId } = req.query;

try {
    const client = await MongoClient.connect("mongodb+srv://Szau:FordMondeo12@cluster0.jfdopa9.mongodb.net/Product-feedback-app?retryWrites=true&w=majority");
    const db = client.db('Product-feedback-app');

    const feedback = await db
        .collection("product-requests")
        .findOne({id:feedbackId})
       

    res.status(200).json(JSON.parse(JSON.stringify(feedback)));

    

    
} catch (e) {
    console.error(e);
}


  
}
