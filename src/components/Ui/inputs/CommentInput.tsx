const CommentInput: React.FC<{
  onContentChange: (content: string) => void;
  comment: string;
  onCounterChange: (counter: number) => void;
}> = ({ onContentChange, comment, onCounterChange }) => {
  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const initialValue = 250;
    const chars = event.target.value.length;
    const charsLeft = initialValue - chars;
    onCounterChange(charsLeft);
    onContentChange(event.target.value);
  };
  return (
    <>
      <textarea
        maxLength={250}
        placeholder="Type your comment here"
        className="h-[80px] w-[279px] resize-none bg-custom-very-light-gray p-3 text-body3 font-normal outline-none md:w-[623px] md:text-body2 xl:w-[759px]"
        onChange={changeHandler}
        value={comment}
      />
    </>
  );
};

export default CommentInput;
