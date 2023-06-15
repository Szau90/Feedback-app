import { ReactNode } from "react";

export const Layout: React.FC<{
  Navigation: ReactNode;
  SuggestionHeader: ReactNode;
  Feedback: ReactNode;
}> = ({ Navigation, SuggestionHeader, Feedback }) => {
  return (
    <>
      <div className="h-fit w-screen gap-x-[30px] md:h-auto xl:grid xl:w-auto">
        <section className="md:flex md:justify-center xl:col-start-1 xl:row-span-2">
          {Navigation}
        </section>
        <section className=" md:flex md:justify-center xl:col-start-2 xl:row-start-1 xl:row-end-2 ">
          {SuggestionHeader}
        </section>
        <section className="flex flex-col items-center xl:col-start-2 xl:items-start">
          {Feedback}
        </section>
      </div>
    </>
  );
};
