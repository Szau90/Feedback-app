import { MongoClient } from "mongodb";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Logo from "@/components/Ui/Logo";

import { Jost } from "next/font/google";

import FeedbackList from "@/components/Feedbacklist";
import Feedback from "@/models/feedback";
import CategoryList from "@/components/Ui/CategoryList";
import { RoadmapList } from "@/components/Ui/RoadmapList";
import { Navigation } from "@/components/Ui/Navigation";

import Dropdown from "@/components/Ui/Dropdown";
import { SuggestionHeader } from "@/components/Ui/SuggestionsHeader";
import { Nofeedback } from "@/components/Nofeedback";
import { Layout } from "@/components/Layout/Layout";

const jost = Jost({ subsets: ["latin"] });

const Home = ({
  productRequests,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const statusArray = productRequests.map((s) => s.status);
  const planned = statusArray.filter((f) => f === "planned").length;
  const inProgress = statusArray.filter((f) => f === "in-progress").length;
  const live = statusArray.filter((f) => f === "live").length;

  const allFeedback = productRequests
    .filter((f) => f.status === "suggestion")
    .map((f) => (
      <FeedbackList
        key={f.id}
        id={f.id}
        title={f.title}
        comments={f.comments}
        category={f.category}
        description={f.description}
        upvotes={f.upvotes}
      />
    ));

  const navigation = (
    <Navigation planned={planned} inProgress={inProgress} live={live} />
  );
  const suggestionHeader = <SuggestionHeader />;

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start bg-custom-very-light-gray  ${jost.className}`}
    >
      <Layout
        SuggestionHeader={suggestionHeader}
        Navigation={navigation}
        Feedback={allFeedback}
      />
    </main>
  );
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

export default Home;
