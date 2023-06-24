import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import Dropdown from "../Ui/Dropdown";
import { setCategory } from "@/store/uiSlice";

const FeedbackCategoryInput = () => {

    const dispatch = useAppDispatch()

  const category = useSelector((state:RootState)=> state.ui.category)
  const showDropdown = useSelector((state:RootState) => state.ui.showDropdownMenu )

  const onCategoryChange = (option:string) => {
    dispatch(setCategory(option))
  }

    return (
        <div className="mt-[24px] h-[105px] w-[279px] md:w-[456px]">
        <h3 className="mb-[3px] text-[13px] font-bold text-custom-very-dark-gray md:text-[14px]">
          Category
        </h3>
        <p className="mb-[16px] text-[13px] text-custom-gray md:text-[14px]">
          Choose a category for your feedback
        </p>
        <div className="h-[48px] w-[279px] md:w-[456px]">
          <Dropdown
            placeHolder={"Feature"}
            color="text-custom-very-dark-gray"
            background="bg-custom-very-light-gray"
            options={["Feature", "UI", "UX", "Enhancement", "Bug"]}
            padding="px-[15px]"
            position="top-[60px] left-0"
            width="w-[279px] md:w-[456px]"
            height=" max-h-[250px]"
            handleValueChange={onCategoryChange}
            selectedValue={category}
            showDropdown={showDropdown}
          
          />
        </div>
      </div>  
    ) 
};

export default FeedbackCategoryInput;