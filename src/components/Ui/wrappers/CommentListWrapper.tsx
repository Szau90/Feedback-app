import { ReactNode } from "react";

const CommentListWrapper: React.FC<{
  children: ReactNode;
  index: number;
  showReply: boolean;
}> = ({ children, index, showReply }) => {
  return (
    <div
      className={`h-fit w-[280px] md:w-[625px] xl:w-[761px] ${
        index === 0
          ? `first:border-b  md:first:${
              showReply === true ? "h-fit" : "h-[155px]"
            }`
          : ""
      } `}
    >
      {children}
    </div>
  );
};

export default CommentListWrapper;
