import { MongoClient } from "mongodb";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { useRouter } from "next/router";
import { Jost } from "next/font/google";

import GoBackBtn from "@/components/Ui/buttons/GoBackBtn";
import Image from "next/image";
import Feedback from "@/models/feedback";
import EditFeedbackForm from "@/components/Forms/EditFeedbackForm";
import Head from "next/head";

const jost = Jost({ subsets: ["latin"] });

const EditFeedback = ({
  feedback,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const {
    title,
    description,
    status,
    category,
    id,
    comments,
    upvotes,
    upvotedBy,
    isUpvoted,
  } = feedback;

  const goBack = () => {
    router.push(`/${router.query.feedbackId}`);
  };

  return (
    <>
    <Head>
        <title>Edit {title}</title>
        <meta name="description" content=" edit Feedback" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-start bg-custom-very-light-gray  ${jost.className}`}
      >
        {" "}
        <div className="mt-[34px] w-[327px] md:w-[540px]">
          <GoBackBtn action={goBack} text="text-custom-gray" label="Go Back" />
        </div>
        <div className="relative mb-[60px]  mt-[60px] h-[893px] w-[327px] md:w-[540px]">
          <Image
            src={"/assets/shared/icon-edit-feedback.svg"}
            width={40}
            height={40}
            alt="new feedback"
            className="absolute -top-5 left-6 md:-top-7 md:h-[56px] md:w-[56px]"
          />

          <div className="flex h-[893px] justify-center rounded-[10px] bg-white pt-10">
            <div className="w-[279px] md:w-[456px]">
              <h3 className="text-h4 text-custom-very-dark-gray md:text-h2">
                Editing &apos;{title}&apos;
              </h3>
              <EditFeedbackForm
                title={title}
                description={description}
                status={status}
                category={category}
                id={id}
                comments={comments}
                upvotes={upvotes}
                upvotedBy={upvotedBy}
                isUpvoted={isUpvoted}
              />
            </div>
          </div>
        </div>
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

export default EditFeedback;
