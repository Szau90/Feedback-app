import { MongoClient } from "mongodb";
import { GetStaticProps, InferGetStaticPropsType } from "next";


import { Inter } from 'next/font/google'


import FeedbackList from '@/components/Feedbacklist'
import Feedback from "@/models/feedback";

const inter = Inter({ subsets: ['latin'] })



 const Home = ({productRequests}: InferGetStaticPropsType<typeof getStaticProps>) => {

  const allFeedback = productRequests.map((f) => (
    <FeedbackList key={f.id} id={f.id} title={f.title} comments={f.comments} category={f.category} description={f.description} upvotes={f.upvotes} />
  ))

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      
    
      
      {allFeedback}
    </main>
  )
}




export const getStaticProps: GetStaticProps<{
  productRequests: Feedback[];
}> = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://Szau:FordMondeo12@cluster0.jfdopa9.mongodb.net/Product-feedback-app?retryWrites=true&w=majority'
  );
  const db = client.db();

  const collection = db.collection('product-requests');

  const result = await collection.find().toArray();

  return {
    props: {
      productRequests: result.map((feedback) => ({
    
          id: feedback.id,
          title: feedback.title,
          category: feedback.category,
          upvotes: feedback.upvotes,
          status: feedback.status,
          description: feedback.description,
          comments: feedback.comments || null,
  
      }))
    },
    revalidate: 1,
  };
};

export default Home;