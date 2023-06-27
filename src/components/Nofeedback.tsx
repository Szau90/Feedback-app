import Image from "next/image";
import MainBtn from "./Ui/buttons/MainBtn";
import { useRouter } from "next/router";

export const Nofeedback = () => {
  const router = useRouter();

  const action = () => {
    router.push("/new-feedback");
  };
  return (
    <>
      <div className="mt-[32px] flex h-[460px] w-[327px] items-center justify-center rounded-[10px] bg-white md:mt-[24px] md:h-[600px] md:w-[689px] xl:mt-[24px] xl:h-[600px] xl:w-[825px]">
        <div className="flex h-[308px] w-[278px] flex-col items-center gap-[39px] md:w-[410px] xl:h-[379px] xl:gap-[53px]">
          <Image
            src={"assets/suggestions/illustration-empty.svg"}
            width={129}
            height={136}
            alt="empty"
            className="h-[108px] w-[102px] md:h-[136px] md:w-[129px]"
          />
          <div className="flex h-[189px] w-[278px] flex-col items-center md:w-[410px]">
            <h1 className="mb-[14px] text-center text-h3 md:mb-[16px] md:text-h1">
              There is no feedback yet.
            </h1>
            <p className="mb-[24px] w-full text-center text-body3 font-normal md:mb-[48px]  md:text-body1">
              Got a suggestion? Found a bug that needs to be squashed? We love
              hearing about new ideas to improve our app.
            </p>
            <div className="w-[134px] md:w-[158px]">
              <MainBtn
                label="+ Add Feedback"
                action={action}
                background="bg-custom-purple"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
