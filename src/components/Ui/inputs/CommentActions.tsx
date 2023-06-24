import CommentInputCounter from "./CommentInputCounter";
import MainBtn from "../buttons/MainBtn";

const CommentActions: React.FC<{ counter: number }> = ({ counter }) => {
  return (
    <>
      <div className="mt-[16px] flex w-[279px] items-center justify-between md:w-[623px] xl:w-[759px]">
        <CommentInputCounter counter={counter} />
        <div className="w-[119px] md:w-[142px]">
          <MainBtn
            label="Post Comment"
            action={() => {}}
            background="bg-custom-purple"
            btnType="submit"
          />
        </div>
      </div>
    </>
  );
};

export default CommentActions;
