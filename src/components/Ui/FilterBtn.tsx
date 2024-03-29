import { useAppDispatch } from "@/store/store";
import { filterFeedback } from "@/store/feedbackSlice";

export const FilterBtn: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    dispatch(filterFeedback(value));
  };
  return (
    <>
      <button
        className=" mb-[15px] mr-[10px] rounded-lg bg-custom-very-light-gray px-3 py-[5.5px] text-body3 capitalize text-custom-dark-blue hover:bg-custom-light-gray active:bg-custom-dark-blue active:text-white"
        type="button"
        onClick={clickHandler}
      >
        {label}
      </button>
    </>
  );
};
