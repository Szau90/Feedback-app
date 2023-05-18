import Dropdown from "@/components/Ui/Dropdown";
import GoBackBtn from "@/components/Ui/buttons/GoBackBtn";
import MainBtn from "@/components/Ui/buttons/MainBtn";
import { Jost } from "next/font/google";
import Image from "next/image";
import Feedback from "@/models/feedback";
import { MongoClient } from "mongodb";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import { useRouter } from "next/router";
import { title } from "process";

const jost = Jost({ subsets: ["latin"] });

const EditFeedback = ({
  productRequests,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const title = productRequests
    .filter((f) => f.id.toString() === router.query.feedbackId)
    .map((feedback) => (
      <h3 className="text-h4 text-custom-very-dark-gray md:text-h2">
        Editing '{feedback.title}'
      </h3>
    ));

  const placeholderTitle = productRequests
    .filter((f) => f.id.toString() === router.query.feedbackId)
    .map((f) => f.title);
  const placeholderDescription = productRequests
    .filter((f) => f.id.toString() === router.query.feedbackId)
    .map((f) => f.description);
  const placeholderStatus = productRequests
    .filter((f) => f.id.toString() === router.query.feedbackId)
    .map((f) => f.status);

    const goBack = () => {
      router.push(`/${router.query.feedbackId}`)
    }

  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center justify-start bg-custom-very-light-gray  ${jost.className}`}
      >
        {" "}
        <div className="mt-[34px] w-[327px] md:w-[540px]">
          <GoBackBtn action={goBack} label="Go Back" />
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
              {title}
              <div className="mt-[24px] h-[105px] w-[279px] md:w-[456px]">
                <h3 className="mb-[3px] text-[13px] font-bold text-custom-very-dark-gray md:text-[14px]">
                  Feedback Title
                </h3>
                <p className="mb-[16px] text-[13px] text-custom-gray md:text-[14px]">
                  Add a short, descriptive headline
                </p>
                <input
                  type="text"
                  defaultValue={placeholderTitle}
                  className="h-[48px] w-[279px] bg-custom-very-light-gray px-5 text-[13px] outline-none md:w-[456px]"
                />
              </div>
              <div className="mt-[24px] h-[105px] w-[279px] md:w-[456px]">
                <h3 className="mb-[3px] text-[13px] font-bold text-custom-very-dark-gray md:text-[14px]">
                  Category
                </h3>
                <p className="mb-[16px] text-[13px] text-custom-gray md:text-[14px]">
                  Choose a category for your feedback
                </p>
                <div className="h-[48px] w-[279px] md:w-[456px]">
                  <Dropdown
                    placeHolder={"Feature"}
                    color="text-custom-very-dark-gray"
                    background="bg-custom-very-light-gray"
                    options={["Feature", "UI", "UX", "Enhancement", "Bug"]}
                    padding="px-[15px]"
                    position="top-[60px] left-0"
                    width="w-[279px] md:w-[456px]"
                    height=" max-h-[250px]"
                  />
                </div>
              </div>
              <div className="mt-[24px] h-[105px] w-[279px] md:w-[456px]">
                <h3 className="mb-[3px] text-[13px] font-bold text-custom-very-dark-gray md:text-[14px]">
                  Update status
                </h3>
                <p className="mb-[16px] text-[13px] text-custom-gray md:text-[14px]">
                  Change feature state
                </p>
                <div className="h-[48px] w-[279px] md:w-[456px]">
                  <Dropdown
                    placeHolder="Planned"
                    color="text-custom-very-dark-gray"
                    background="bg-custom-very-light-gray"
                    options={["Suggestion", "Planned", "In-Progress", "Live"]}
                    padding="px-[15px]"
                    position="top-[60px] left-0"
                    width="w-[279px] md:w-[456px]"
                    height=" max-h-[250px]"
                  />
                </div>
              </div>
              <div className="mt-[24px] h-[220px] w-[279px] md:w-[456px]">
                <h3 className="mb-[3px] text-[13px] font-bold text-custom-very-dark-gray md:text-[14px]">
                  Feedback detail
                </h3>
                <p className="mb-[16px] text-[13px] text-custom-gray md:text-[14px]">
                  Include any specific comments on what should be improved,
                  added, etc.
                </p>
                <textarea
                  defaultValue={placeholderDescription}
                  className="h-[120px] w-[279px] resize-none bg-custom-very-light-gray p-3 text-body3 font-normal text-custom-very-dark-gray outline-none md:w-[456px]  md:text-body2"
                />
              </div>
              <div className="flex flex-col gap-[16px] md:flex-row-reverse md:justify-between">
                <div className="flex  gap-[16px] flex-col md:flex-row-reverse">
                <div className="md:h-[44px] md:w-[144px]">
                  <MainBtn
                    action={() => {}}
                    label="Save Changes"
                    background="bg-custom-purple"
                  />
                </div>
                <div className="md:h-[44px] md:w-[93px]">
                  <MainBtn
                    action={() => {}}
                    label="Cancel"
                    background="bg-custom-very-dark-gray"
                  />
                </div>
                </div>
                <div className="md:h-[44px] md:w-[93px]">
                  <MainBtn
                    action={() => {}}
                    label="Delete"
                    background="bg-[#D73737]"
                  />
                </div>
              </div>
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

export default EditFeedback;
