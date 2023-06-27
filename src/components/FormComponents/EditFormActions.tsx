import { useRouter } from "next/router";
import MainBtn from "../Ui/buttons/MainBtn";
import { useAppDispatch } from "@/store/store";
import { deleteFeedback } from "@/store/feedbackSlice";

const EditFormActions: React.FC<{
  id: number;
  resetTitle: () => void;
  resetDescription: () => void;
}> = ({ id, resetDescription, resetTitle }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteFeedback(id));
    router.push("/");
  };

  const handleCancel = () => {
    resetTitle();
    resetDescription();
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-[16px] md:flex-row-reverse md:justify-between">
      <div className="flex  flex-col gap-[16px] md:flex-row-reverse">
        <div className="md:h-[44px] md:w-[144px]">
          <MainBtn
            action={() => {}}
            label="Save Changes"
            background="bg-custom-purple"
            btnType="submit"
          />
        </div>
        <div className="md:h-[44px] md:w-[93px]">
          <MainBtn
            action={handleCancel}
            label="Cancel"
            background="bg-custom-very-dark-gray"
          />
        </div>
      </div>
      <div className="md:h-[44px] md:w-[93px]">
        <MainBtn
          action={() => handleDelete(id)}
          label="Delete"
          background="bg-[#D73737]"
        />
      </div>
    </div>
  );
};

export default EditFormActions;
