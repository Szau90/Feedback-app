import { MongoClient } from "mongodb";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { Jost } from "next/font/google";
import Feedback from "@/models/feedback";
import { useRouter } from "next/router";
import { FeedbackDetail } from "@/components/FeedbackDetail";
import Head from "next/head";

const jost = Jost({ subsets: ["latin"] });

const DetailPage = ({
  feedback,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  return (
    <>
    <Head>
        <title>{feedback.title}</title>
        <meta name="description" content="Feedback detail page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          isUpvoted={feedback.isUpvoted}
        />
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_URI!
  );
  const db = client.db();

  const collection = db.collection("product-requests");

  const result = await collection.find<Feedback>({}).toArray();

  const paths = result.map((i) => ({
    params: { feedbackId: i.id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<{ feedback: Feedback }> = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<{ feedback: Feedback }>> => {
  if (typeof context.params !== "undefined") {
    const feedbackId = context.params.feedbackId;
    if (typeof feedbackId === "string") {
      const parsedFeedbackId = parseInt(feedbackId);
      if (!isNaN(parsedFeedbackId)) {
        const client = await MongoClient.connect(
          process.env.NEXT_PUBLIC_MONGODB_URI!
        );
        const db = client.db();
        const feedback = await db
          .collection("product-requests")
          .findOne({ id: parsedFeedbackId });

        client.close();

        if (feedback) {
          return {
            props: {
              feedback: {
                id: feedback.id,
                title: feedback.title,
                category: feedback.category,
                upvotes: feedback.upvotes,
                status: feedback.status,
                description: feedback.description,
                comments: feedback.comments || null,
                upvotedBy: feedback.upvotedBy || null,
                isUpvoted: feedback.isUpvoted,
              },
            },
            revalidate: 1,
          };
        }
      }
    }
  }

  return {
    notFound: true,
  };
};

export default DetailPage;
