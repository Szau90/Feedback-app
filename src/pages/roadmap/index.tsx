import { MongoClient } from "mongodb";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import { Jost } from "next/font/google";
import RoadmapItem from "@/components/RoadmapItem";
import Feedback from "@/models/feedback";
import RoadmapList from "@/components/RoadmapList";
import Head from "next/head";

const jost = Jost({ subsets: ["latin"] });

const Roadmap = ({
  feedback,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const statusPlanned = feedback
    .filter((f) => f.status === "Planned")
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
        isUpvoted={f.isUpvoted}
      />
    ));
  const statusLive = feedback
    .filter((f) => f.status === "Live")
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
        isUpvoted={f.isUpvoted}
      />
    ));
  const statusInProgress = feedback
    .filter((f) => f.status === "In-Progress")
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
        isUpvoted={f.isUpvoted}
      />
    ));

  type StatusData = {
    [key: string]: {
      status: JSX.Element[];
      description: string;
    };
  };

  const statusData: StatusData = {
    live: {
      status: statusLive,
      description: "Released Features",
    },
    inProgress: {
      status: statusInProgress,
      description: "Currently beeing developed",
    },
    planned: {
      status: statusPlanned,
      description: "Ideas prioritized for research",
    },
  };

  return (
    <>
    <Head>
        <title>Roadmap</title>
        <meta name="description" content=" create Feedback" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_URI!
  );
  const db = client.db();

  const feedback = await db.collection("product-requests").find({}).toArray();

  client.close();

  return {
    props: {
      feedback: feedback.map((feedback) => ({
        id: feedback.id,
        title: feedback.title,
        category: feedback.category,
        upvotes: feedback.upvotes,
        status: feedback.status,
        description: feedback.description,
        comments: feedback.comments || null,
        upvotedBy: feedback.upvotedBy || null,
        isUpvoted: feedback.isUpvoted,
      })),
    },
    revalidate: 1,
  };
};

export default Roadmap;
