import GoBackBtn from "@/components/Ui/buttons/GoBackBtn";
import { Jost } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import AddFeedbackForm from "@/components/Forms/AddFeedbackForm";


const jost = Jost({ subsets: ["latin"] });

const NewFeedback = () => {
  
  const router = useRouter();

  const gobackHandler = () => {
    router.push("/");
  };

  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center justify-start bg-custom-very-light-gray  ${jost.className}`}
      >
        {" "}
        <div className="mt-[34px] w-[327px] md:w-[540px]">
          <GoBackBtn
            action={gobackHandler}
            label="Go Back"
            text="text-custom-gray"
          />
        </div>
        <div className="relative mb-[60px]  mt-[60px] h-[728px] w-[327px] md:w-[540px]">
          <Image
            src={"/assets/shared/icon-new-feedback.svg"}
            width={40}
            height={40}
            alt="new feedback"
            className="absolute -top-5 left-6 md:-top-7 md:h-[56px] md:w-[56px]"
          />
         <AddFeedbackForm />
        </div>
      </main>
    </>
  );
};

export default NewFeedback;
