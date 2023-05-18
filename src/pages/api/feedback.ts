import { NextApiRequest, NextApiResponse } from "next";
import {MongoClient} from "mongodb";
import nextConnect from 'next-connect';
import { ObjectId } from "mongodb";





export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
const { feedbackId } = req.query;

try {
    const client = await MongoClient.connect("mongodb+srv://Szau:FordMondeo12@cluster0.jfdopa9.mongodb.net/Product-feedback-app?retryWrites=true&w=majority");
    const db = client.db();

    const feedback = db
        .collection("product-requests")
        .find({})
       

    res.json(feedback);
} catch (e) {
    console.error(e);
}


  
}
