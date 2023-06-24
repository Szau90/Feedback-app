import { ReactNode } from "react";

const ReplyListWrapper: React.FC<{
  children: ReactNode;
  index: number;
  commentIndex: number;
}> = ({ children, index, commentIndex }) => {
  return (
    <div key={index * 10}>
      {index === 0 && commentIndex !== 0 && (
        <div className="absolute inset-x-0 h-[216px]  w-[1px] bg-custom-gray opacity-20 md:-top-20 md:left-5 md:h-[267px]"></div>
      )}
      <div
        className={`mb-[16px] flex h-fit w-[280px] flex-col items-end justify-start md:w-[578px] md:items-start xl:w-[714px] `}
      >
        <div className="w-[256px] md:w-[578px] xl:w-[714px]">{children}</div>
      </div>
    </div>
  );
};

export default ReplyListWrapper;
