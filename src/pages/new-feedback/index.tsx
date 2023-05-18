import Dropdown from "@/components/Ui/Dropdown";
import GoBackBtn from "@/components/Ui/buttons/GoBackBtn";
import MainBtn from "@/components/Ui/buttons/MainBtn";
import { Jost } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";

const jost = Jost({ subsets: ["latin"] });

const NewFeedback = () => {

  const router = useRouter();

  const gobackHandler = () => {
    router.push('/')
  };
  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center justify-start bg-custom-very-light-gray  ${jost.className}`}
      >
        {" "}
        <div className="mt-[34px] w-[327px] md:w-[540px]">
          <GoBackBtn action={gobackHandler} label="Go Back" />
        </div>
        <div className="relative mb-[60px]  mt-[60px] h-[728px] w-[327px] md:w-[540px]">
          <Image
            src={"/assets/shared/icon-new-feedback.svg"}
            width={40}
            height={40}
            alt="new feedback"
            className="absolute -top-5 left-6 md:-top-7 md:h-[56px] md:w-[56px]"
          />

          <div className="flex h-[708px] justify-center rounded-[10px] bg-white pt-10">
            <div className="w-[279px] md:w-[456px]">
              <h3 className="text-h3 text-custom-very-dark-gray md:text-h1">
                Create New Feedback
              </h3>
              <div className="mt-[24px] h-[105px] w-[279px] md:w-[456px]">
                <h3 className="mb-[3px] text-[13px] font-bold text-custom-very-dark-gray md:text-[14px]">
                  Feedback Title
                </h3>
                <p className="mb-[16px] text-[13px] text-custom-gray md:text-[14px]">
                  Add a short, descriptive headline
                </p>
                <input
                  type="text"
                  className="h-[48px] w-[279px] bg-custom-very-light-gray px-5 text-[13px] outline-none md:w-[456px]"
                />
              </div>
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
                  />
                </div>
              </div>
              <div className="mt-[24px] h-[220px] w-[279px] md:w-[456px]">
                <h3 className="mb-[3px] text-[13px] font-bold text-custom-very-dark-gray md:text-[14px]">
                  Feedback detail
                </h3>
                <p className="mb-[16px] text-[13px] text-custom-gray md:text-[14px]">
                  Include any specific comments on what should be improved,
                  added, etc.
                </p>
                <textarea className="h-[120px] w-[279px] resize-none bg-custom-very-light-gray p-3 text-body3 font-normal text-custom-very-dark-gray outline-none md:w-[456px]  md:text-body2" />
              </div>
              <div className="flex flex-col gap-[16px] md:flex-row-reverse">
                <div className="md:w-[144px] md:h-[44px]">
                  <MainBtn
                    action={() => {}}
                    label="Add Feedback"
                    background="bg-custom-purple"
                  />
                </div>
                <div className="md:w-[93px] md:h-[44px]">
                  <MainBtn
                    action={() => {}}
                    label="Cancel"
                    background="bg-custom-very-dark-gray"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NewFeedback;
