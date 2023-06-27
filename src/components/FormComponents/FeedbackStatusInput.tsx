import { useAppDispatch, RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Dropdown from "../Ui/Dropdown";
import { setStatus } from "@/store/uiSlice";
import { toogleSecondDropdown } from "@/store/uiSlice";

const FeedbackStatusInput: React.FC<{ status: string }> = ({ status }) => {
  const dispatch = useAppDispatch();
  const showSecondDropdown = useSelector(
    (state: RootState) => state.ui.showSecondDropdown
  );
  const selectedStatus = useSelector((state: RootState) => state.ui.status);

  const handleStatusChange = (option: string) => {
    dispatch(setStatus(option));
  };
  const handleDropdownClick = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(toogleSecondDropdown());
  };

  return (
    <div className="mt-[24px] h-[105px] w-[279px] md:w-[456px]">
      <h3 className="mb-[3px] text-[13px] font-bold text-custom-very-dark-gray md:text-[14px]">
        Update status
      </h3>
      <p className="mb-[16px] text-[13px] text-custom-gray md:text-[14px]">
        Change feature state
      </p>
      <div className="h-[48px] w-[279px] md:w-[456px]">
        <Dropdown
          placeHolder={`${status}`}
          color="text-custom-very-dark-gray"
          background="bg-custom-very-light-gray"
          options={["Suggestion", "Planned", "In-Progress", "Live"]}
          padding="px-[15px]"
          position="top-[60px] left-0"
          width="w-[279px] md:w-[456px]"
          height=" max-h-[250px]"
          selectedValue={selectedStatus}
          handleValueChange={handleStatusChange}
          showDropdown={showSecondDropdown}
          onDropdownClick={handleDropdownClick}
        />
      </div>
    </div>
  );
};

export default FeedbackStatusInput;
