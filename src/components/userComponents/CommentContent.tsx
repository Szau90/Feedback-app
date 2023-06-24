const CommentContent: React.FC<{ content: string }> = ({ content }) => {
  return (
    <>
      <div className="pb-5 text-[13px] text-custom-gray md:ml-[72px] md:w-[553px] md:text-[15px] xl:w-[594px] ">
        {content}
      </div>
    </>
  );
};

export default CommentContent;
