import Image from "next/image";
const GoBackBtn: React.FC<{
  label: string;
  text: string;
  action: () => void;
}> = ({ label, text, action }) => {
  return (
    <>
      <button
        onClick={action}
        className={`flex w-[72px] items-center justify-between text-[13px] font-bold ${text} md:text-[14px]`}
      >
        <Image
          src={"/assets/shared/icon-arrow-left.svg"}
          width={7}
          height={10}
          alt={"icon-arrow-left"}
        />
        {label}
      </button>
    </>
  );
};

export default GoBackBtn;
