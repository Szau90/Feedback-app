import Image from "next/image";

const Logo: React.FC<{ action: () => void; showNav: boolean }> = ({
  action,
  showNav,
}) => {
  return (
    <>
      <div className="flex flex-row  bg-[url('/assets/suggestions/mobile/background-header.png')] bg-cover bg-no-repeat md:rounded-[10px] md:bg-[url('/assets/suggestions/tablet/background-header.png')] xl:bg-[url('/assets/suggestions/desktop/background-header.png')] xl:bg-auto">
        <div className="flex h-[72px] w-full flex-col items-baseline justify-end border-0 pb-[24px] pl-[24px] md:h-[178px] md:w-[223px] xl:h-[137px] xl:w-[255px]">
          <h1 className="text-h4 font-bold text-white md:text-h2">
            Frontend Mentor
          </h1>
          <p className="text-body3 font-normal text-custom-very-light-gray md:text-body2 ">
            Feedback Board
          </p>
        </div>
        {!showNav && (
          <div className=" flex pr-[24px] md:hidden">
            <Image
              src={"/assets/shared/mobile/icon-hamburger.svg"}
              width={20}
              height={17}
              alt="hamburger"
              style={{ objectFit: "contain" }}
              onClick={action}
            />
          </div>
        )}
        {showNav && (
          <div className=" flex pr-[24px] md:hidden">
            <Image
              src={"/assets/shared/mobile/icon-close.svg"}
              width={20}
              height={17}
              alt="hamburger"
              style={{ objectFit: "contain" }}
              onClick={action}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Logo;
