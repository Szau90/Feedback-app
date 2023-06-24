const CommentsLength: React.FC<{ totalLength: number }> = ({ totalLength }) => {
  return (
    <h3 className="my-[24px] ml-[24px] text-h3 text-custom-very-dark-gray">
      {totalLength} Comments
    </h3>
  );
};

export default CommentsLength;
