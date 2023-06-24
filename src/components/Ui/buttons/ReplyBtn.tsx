const ReplyBtn: React.FC<{
  replyHandler: (commentId: number) => void;
  commentId: number;
}> = ({ replyHandler, commentId }) => {
  return (
    <button
      onClick={() => replyHandler(commentId)}
      className="text-[13px] font-bold text-custom-dark-blue "
    >
      Reply
    </button>
  );
};

export default ReplyBtn;
