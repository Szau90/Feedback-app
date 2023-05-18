import Image from "next/image";
const GoBackBtn: React.FC<{
    label: string;
    action: () => void;
   
  }> = ({label, action}) => {

    return (
      <>
        <button onClick={action} className="flex items-center text-[13px] font-bold w-[72px] justify-between text-custom-gray md:text-[14px]">
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