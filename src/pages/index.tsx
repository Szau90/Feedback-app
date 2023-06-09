import { GetStaticProps, InferGetStaticPropsType } from "next";

import { Jost } from "next/font/google";

import FeedbackList from "@/components/Feedbacklist";
import Feedback from "@/models/feedback";
import { Navigation } from "@/components/Ui/Navigation";

import { SuggestionHeader } from "@/components/Ui/SuggestionsHeader";
import { Nofeedback } from "@/components/Nofeedback";
import { Layout } from "@/components/Layout/Layout";
import { useDispatch } from 'react-redux';


const jost = Jost({ subsets: ["latin"] });

const API_URL = process.env.API_URL || "http://localhost:3000"; 

const Home = ({
  feedback,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const statusArray = feedback.map((s) => s.status);
  const planned = statusArray.filter((f) => f === "Planned").length;
  const inProgress = statusArray.filter((f) => f === "In-Progress").length;
  const live = statusArray.filter((f) => f === "Live").length;

  


  const allFeedback = feedback
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
        status={f.status}
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
  feedback: Feedback[];
}> = async () => {
  const res = await fetch (`${API_URL}/api/feedback`)

  if (!res.ok) {
    throw new Error('Cannot find feedback')
  }

  const data:Feedback[] = await res.json()

  return {
    props: {
      feedback: data.map((feedback:Feedback) => ({
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
