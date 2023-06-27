import { MongoClient } from "mongodb";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Jost } from "next/font/google";
import FeedbackList from "@/components/Feedbacklist";
import Feedback from "@/models/feedback";
import { Navigation } from "@/components/Ui/Navigation";
import { SuggestionHeader } from "@/components/Ui/SuggestionsHeader";
import { Nofeedback } from "@/components/Nofeedback";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Head from "next/head";

const jost = Jost({ subsets: ["latin"] });

const Home = ({ feedback }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const selectedCategory = useSelector(
    (state: RootState) => state.feedback.category
  );

  const selectedSortBy = useSelector((state: RootState) => state.ui.sortBy);

  const categoryFilter = feedback
    .filter((f) => f.status === "Suggestion")
    .filter((f) => f.category === selectedCategory);

  const filteredFeedback =
    selectedCategory === "all"
      ? feedback.filter((f) => f.status === "Suggestion")
      : categoryFilter;

  const feedbackWithCommentCount = filteredFeedback.map((f) => {
    const commentCount = f.comments.reduce((count, comment) => {
      return count + 1 + (comment.replies ? comment.replies.length : 0);
    }, 0);

    return { ...f, commentCount };
  });

  selectedSortBy === "Least Comments"
    ? feedbackWithCommentCount.sort((a, b) => a.commentCount - b.commentCount)
    : selectedSortBy === "Most Comments"
    ? feedbackWithCommentCount.sort((a, b) => b.commentCount - a.commentCount)
    : selectedSortBy === "Most Upvotes"
    ? feedbackWithCommentCount.sort((a, b) => b.upvotes - a.upvotes)
    : selectedSortBy === "Least Upvotes"
    ? feedbackWithCommentCount.sort((a, b) => a.upvotes - b.upvotes)
    : feedbackWithCommentCount;

  const suggestions = feedbackWithCommentCount.map((f) => (
    <FeedbackList
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

  return (
    <>
      <Head>
        <title>Feedback app</title>
        <meta name="description" content="Browse or create upvote or comment Feedbacks" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-start bg-custom-very-light-gray  ${jost.className}`}
      >
        <div className="flex h-fit w-screen flex-col justify-center gap-x-[30px] md:h-auto md:items-center xl:flex xl:flex-row xl:items-start">
          <Navigation feedback={feedback} />

          <div className="flex flex-col items-center md:items-start">
            <SuggestionHeader counter={filteredFeedback.length} />

            {filteredFeedback.length > 0 ? suggestions : <Nofeedback />}
          </div>
        </div>
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

export default Home;
