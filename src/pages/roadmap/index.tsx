import RoadmapItem from "@/components/RoadmapItem";

import Feedback from "@/models/feedback";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";

import { Jost } from "next/font/google";
import RoadmapList from "@/components/RoadmapList";

const jost = Jost({ subsets: ["latin"] });
const API_URL = process.env.API_URL || "http://localhost:3000";

const Roadmap = ({
  feedback,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const statusPlanned = feedback
    .filter((f) => f.status === "planned")
    .map((f) => (
      <RoadmapItem
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
  const statusLive = feedback
    .filter((f) => f.status === "live")
    .map((f) => (
      <RoadmapItem
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
  const statusInProgress = feedback
    .filter((f) => f.status === "in-progress")
    .map((f) => (
      <RoadmapItem
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

    type StatusData = {
      [key: string]: {
        status: JSX.Element[];
        description: string;
      };
    };

  const statusData:StatusData = {
    live: {
      status: statusLive,
      description: "Released Features",
    },
    inProgress: {
      status: statusInProgress,
      description: "Currently beeing developed"
    },
    planned: {
      status: statusPlanned,
      description: "Ideas prioritized for research"
    },
  };

  

  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center justify-start bg-custom-very-light-gray  ${jost.className}`}
      >
       <RoadmapList statusData={statusData} />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  feedback: Feedback[];
}> = async () => {
  const res = await fetch(`${API_URL}/api/feedback`);
  const feedback: Feedback[] = await res.json();

  return {
    props: {
      feedback: feedback.map((feedback: Feedback) => ({
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

export default Roadmap;
