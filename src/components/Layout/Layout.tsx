import { ReactNode } from "react";

export const Layout: React.FC<{
  Navigation: ReactNode;
  SuggestionHeader: ReactNode;
  Feedback: ReactNode;
}> = ({ Navigation, SuggestionHeader, Feedback }) => {
  return (
    <>
      <div className="h-fit w-screen gap-x-[30px] md:h-auto xl:flex xl:flex-row xl:justify-center">
        <section className="md:flex md:justify-center ">
          {Navigation}
        </section>
        <div className="flex flex-col">
        <section className=" md:flex md:justify-center ">
          {SuggestionHeader}
        </section>
        <section className="flex flex-col items-center ">
          {Feedback}
        </section>
        </div>
      </div>
    </>
  );
};
