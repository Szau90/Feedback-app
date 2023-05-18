import { useState } from "react";
import MainBtn from "./Ui/buttons/MainBtn";

const AddComment = () => {
  const [count, setCount] = useState(250);

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const initalValue = 250;
    const chars = event.target.value.length;
    const charsLeft = initalValue - chars;
    setCount(charsLeft);
  };
  return (
    <>
      <div className="mb-[100px] mt-[24px] flex h-[234px] w-[327px] flex-col items-center justify-center rounded-[10px] bg-white md:h-[246px] md:w-[689px] md:pb-5 xl:w-[825px]">
        <h3 className="my-[24px] w-[279px] text-h3 text-custom-very-dark-gray md:w-[623px] xl:w-[759px]">
          Add comment
        </h3>
        <div>
          <textarea
            maxLength={250}
            placeholder="Type your comment here"
            className="h-[80px] w-[279px] resize-none bg-custom-very-light-gray p-3 text-body3 font-normal outline-none md:w-[623px] md:text-body2 xl:w-[759px]"
            onChange={changeHandler}
          />
          <div className="mt-[16px] flex w-[279px] items-center justify-between md:w-[623px] xl:w-[759px]">
            <p className="text-body3 font-normal text-custom-gray md:text-body2">
              {count} character left
            </p>
            <div className="w-[119px] md:w-[142px]">
              <MainBtn
                label="Post Comment"
                action={() => {}}
                background="bg-custom-purple"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddComment;
