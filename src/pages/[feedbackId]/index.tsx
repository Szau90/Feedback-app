import { FeedbackDetail } from "@/components/FeedbackDetail";
import Feedback from "@/models/feedback";
import { MongoClient } from "mongodb";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsContext,
  GetStaticPropsResult
} from "next";
import { Jost } from "next/font/google";
import { useRouter } from "next/router";

const jost = Jost({ subsets: ["latin"] });

const API_URL = process.env.API_URL || "http://localhost:3000"; 

const DetailPage = ({
  feedback,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

 

  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center justify-start bg-custom-very-light-gray  ${jost.className}`}
      >
       
            <FeedbackDetail
              key={feedback.id}
              id={feedback.id}
              title={feedback.title}
              comments={feedback.comments}
              category={feedback.category}
              description={feedback.description}
              upvotes={feedback.upvotes}
              status={feedback.status}
            />
        
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://Szau:FordMondeo12@cluster0.jfdopa9.mongodb.net/Product-feedback-app?retryWrites=true&w=majority"
  );
const db = client.db();

  const collection = db.collection("product-requests");

  const result = await collection.find<Feedback>({}).toArray();

  const paths = result.map((i) => ({
    params: { feedbackId: i.id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<{
  feedback: Feedback;
}> = async (context:GetStaticPropsContext): Promise<GetStaticPropsResult<{ feedback: Feedback }>> => {
  if (typeof context.params !== "undefined") {
  const id = context.params.feedbackId
  const res = await fetch (`${API_URL}/api/${id}`)
  if (!res.ok) {
    throw new Error('Cannot find feedback')
  }
  const feedback = await res.json()
  
  return {
    props: {
      feedback
    },
    revalidate: 1,
  };
  
}
return {
  props: {
    feedback:{} as Feedback 
  },
  revalidate: 1,
};
};

export default DetailPage;
