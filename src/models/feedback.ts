export interface Comments {
  id: number;
  content: string;
  user: User;
  replies: Replies[];
  showReply: boolean;
}

export interface User {
  id: number;
  image: string;
  name: string;
  username: string;
}
export interface Replies {
  id: number;
  content: string;
  replyingTo: string;
  user: User;
  showReply: boolean;
}

interface Feedback {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments: Comments[];
  upvotedBy: number[];
  isUpvoted: boolean;
}

export default Feedback;
