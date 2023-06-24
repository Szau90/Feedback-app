const ReplyInput: React.FC<{
  onReplyChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  enteredReply: string;
}> = ({ onReplyChange, enteredReply }) => {
  return (
    <textarea
      className="resize-none rounded-[10px] border border-custom-dark-blue bg-custom-very-light-gray  text-body1 font-normal text-custom-very-dark-gray outline-none xl:h-[80px] xl:w-[556px]"
      onChange={onReplyChange}
      value={enteredReply}
    />
  );
};

export default ReplyInput;
