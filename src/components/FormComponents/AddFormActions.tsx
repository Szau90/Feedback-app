import { useRouter } from "next/router";
import MainBtn from "../Ui/buttons/MainBtn";

const AddFormActions: React.FC<{
  resetTitle: () => void;
  resetDescription: () => void;
}> = ({ resetTitle, resetDescription }) => {
  const router = useRouter();

  const handleCancel = () => {
    resetTitle();
    resetDescription();

    router.push("/");
  };

  return (
    <div className="flex flex-col gap-[16px] md:flex-row-reverse">
      <div className="md:h-[44px] md:w-[144px]">
        <MainBtn
          action={() => {}}
          btnType="submit"
          label="Add Feedback"
          background="bg-custom-purple"
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
  );
};

export default AddFormActions;
