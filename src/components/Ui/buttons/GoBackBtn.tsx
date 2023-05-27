import Image from "next/image";
const GoBackBtn: React.FC<{
    label: string;
    text: string
    action: () => void;
   
  }> = ({label, text, action}) => {

    return (
      <>
        <button onClick={action} className={`flex items-center text-[13px] font-bold w-[72px] justify-between ${text} md:text-[14px]`}>
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