import { useRouter } from "next/router";
import Dropdown from "./Dropdown";
import { SuggestionLabel } from "./SuggestionLabel";
import MainBtn from "./buttons/MainBtn";
import { useAppDispatch, RootState } from "@/store/store";
import { setSortBy } from "@/store/uiSlice";
import { useSelector } from "react-redux";
import { toogleDropdown } from "@/store/uiSlice";

export const SuggestionHeader: React.FC<{ counter: number }> = ({
  counter,
}) => {
  const options = [
    "Most Upvotes",
    "Least Upvotes",
    "Most Comments",
    "Least Comments",
  ];
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleDropdownClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    dispatch(toogleDropdown());
  };

  const selectedValue = useSelector((state: RootState) => state.ui.sortBy);
  const showDropdown = useSelector(
    (state: RootState) => state.ui.showDropdownMenu
  );

  const addFeedbackBtnHandler = () => {
    router.push("/new-feedback");
  };

  const handleSortBy = (option: string) => {
    dispatch(setSortBy(option));
  };
  return (
    <>
      <div className="flex h-[56px] w-full items-center justify-between bg-custom-very-dark-blue px-[24px] md:mt-[40px] md:h-[72px] md:w-[689px] md:justify-center md:rounded-[10px] md:pr-[0px] xl:w-[825px] ">
        <SuggestionLabel counter={counter} />
        <div className="flex w-[189px] flex-row items-center md:w-[300px] xl:w-[425px]">
          <span className=" w-[40px] text-[11px] font-normal text-custom-light-gray md:w-[50px] md:text-[14px]">
            Sort by:
          </span>
          <div className="h-[19px] w-fit ">
            <Dropdown
              options={options}
              color="text-white"
              background=""
              placeHolder="select..."
              padding="p-[5px]"
              position="top-9"
              width="w-[255px]"
              height=" max-h-[200px]"
              handleValueChange={handleSortBy}
              selectedValue={selectedValue}
              showDropdown={showDropdown}
              onDropdownClick={handleDropdownClick}
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
