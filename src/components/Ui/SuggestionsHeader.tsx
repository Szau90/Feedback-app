import { useRouter } from "next/router";
import Dropdown from "./Dropdown";
import { SuggestionLabel } from "./SuggestionLabel";
import MainBtn from "./buttons/MainBtn";
export const SuggestionHeader = () => {
  const options = [
    "Most Upvotes",
    "Least Upvotes",
    "Most Comments",
    "Least Comments",
  ];
  const router = useRouter()

  const addFeedbackBtnHandler = () => {
    router.push('/new-feedback')
  }
  return (
    <>
      <div className="flex h-[56px] w-full items-center justify-between bg-custom-very-dark-blue px-[24px] md:mt-[40px] md:h-[72px] md:w-[689px] md:justify-center md:rounded-[10px] md:pr-[0px] xl:w-[825px] ">
        <SuggestionLabel />
        <div className="flex w-[189px] flex-row items-center md:w-[300px] xl:w-[425px]">
          <span className=" w-[40px] text-[11px] font-normal text-custom-light-gray md:w-[50px] md:text-[14px]">
            Sort by:
          </span>
          <div className="w-fit h-[19px] ">
            <Dropdown
              options={options}
              color="text-white"
              background=""
              placeHolder="select..."
              padding="p-[5px]"
              position="top-9"
              width="w-[255px]"
              height=" max-h-[200px]"
            />
          </div>
        </div>
        <div className="w-[134px] md:w-[158px]">
          <MainBtn
            label="+ Add Feedback"
            action={addFeedbackBtnHandler}
            background="bg-custom-purple"
          />
        </div>
      </div>
    </>
  );
};
