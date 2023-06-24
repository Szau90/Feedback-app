const CommentInputCounter: React.FC<{ counter: number }> = ({ counter }) => {
  return (
    <>
      <p className="text-body3 font-normal text-custom-gray md:text-body2">
        {counter} character left
      </p>
    </>
  );
};

export default CommentInputCounter;
