import { Replies } from "@/models/feedback";
import { useAppDispatch } from "@/store/store";
import { handleReplyToReply } from "@/store/commentsSlice";

const ReplyToReplyBtn: React.FC<{ commentId: number; reply: Replies }> = ({
  commentId,
  reply,
}) => {
  const dispatch = useAppDispatch();

  const clickReplyHandler = (commentId: number, replyId: number) => {
    dispatch(handleReplyToReply({ commentId, replyId }));
  };
  return (
    <button
      onClick={() => clickReplyHandler(commentId, reply.id)}
      className="text-[13px] font-bold text-custom-dark-blue "
    >
      Reply
    </button>
  );
};

export default ReplyToReplyBtn;
