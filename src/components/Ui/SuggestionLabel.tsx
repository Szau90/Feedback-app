import Image from "next/image";

export const SuggestionLabel: React.FC<{ counter: number }> = ({ counter }) => {
  return (
    <>
      <div className="mr-[30px] hidden gap-[16px] md:flex">
        <Image
          src={"/assets/suggestions/icon-suggestions.svg"}
          width={23}
          height={24}
          alt="suggestions"
        />
        <h3 className="text-h3 text-white">{counter} Suggestions</h3>
      </div>
    </>
  );
};
