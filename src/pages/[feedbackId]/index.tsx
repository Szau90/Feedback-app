import { FeedbackDetail } from "@/components/FeedbackDetail";
import Feedback from "@/models/feedback";
import { MongoClient } from "mongodb";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import { Jost } from "next/font/google";
import { useRouter } from "next/router";

const jost = Jost({ subsets: ["latin"] });

const DetailPage = ({
  productRequests,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

 

  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center justify-start bg-custom-very-light-gray  ${jost.className}`}
      >
        {productRequests
          .filter((f) => f.id.toString() === router.query.feedbackId)
          .map((f) => (
            <FeedbackDetail
              key={f.id}
              id={f.id}
              title={f.title}
              comments={f.comments}
              category={f.category}
              description={f.description}
              upvotes={f.upvotes}
             
            />
          ))}
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

  const result = collection.find<Feedback>({}).toArray();

  const paths = (await result).map((i) => ({
    params: { feedbackId: i.id.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{
  productRequests: Feedback[];
}> = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://Szau:FordMondeo12@cluster0.jfdopa9.mongodb.net/Product-feedback-app?retryWrites=true&w=majority"
  );
  const db = client.db();

  const collection = db.collection("product-requests");

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
      })),
    },
    revalidate: 1,
  };
};

export default DetailPage;
