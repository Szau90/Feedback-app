import GoBackBtn from "@/components/Ui/buttons/GoBackBtn";
import { Jost } from "next/font/google";
import Image from "next/image";
import Feedback from "@/models/feedback";
import { MongoClient } from "mongodb";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { useRouter } from "next/router";
import EditFeedbackForm from "@/components/Forms/EditFeedbackForm";

const jost = Jost({ subsets: ["latin"] });

const API_URL = process.env.API_URL || "http://localhost:3000";

const EditFeedback = ({
  feedback,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const { title, description, status, category, id, comments, upvotes } = feedback;

  const goBack = () => {
    router.push(`/${router.query.feedbackId}`);
  };

  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center justify-start bg-custom-very-light-gray  ${jost.className}`}
      >
        {" "}
        <div className="mt-[34px] w-[327px] md:w-[540px]">
          <GoBackBtn
            action={goBack}
            text="text-custom-gray"
            label="Go Back"
          />
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
                Editing '{title}'
              </h3>
              <EditFeedbackForm
                title={title}
                description={description}
                status={status}
                category={category}
                id={id}
                comments={comments}
                upvotes={upvotes}
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
}> = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<{ feedback: Feedback }>> => {
  if (typeof context.params !== "undefined") {
    const id = context.params.feedbackId;

    const res = await fetch(`${API_URL}/api/${id}`);

    const feedback: Feedback = await res.json();

    return {
      props: {
        feedback,
      },
      revalidate: 1,
    };
  }
  return {
    props: {
      feedback: {} as Feedback,
    },
  };
};

export default EditFeedback;
