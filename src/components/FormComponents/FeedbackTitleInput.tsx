import { ChangeEvent } from "react";
const FeedbackTitleInput: React.FC<{
  enteredTitle: string;
  titleChangeHandler: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  titleBlurHandler: () => void;
  titleHasError: boolean;
}> = ({
  enteredTitle,
  titleChangeHandler,
  titleBlurHandler,
  titleHasError,
}) => {
  return (
    <div className="mt-[24px] h-[105px] w-[279px] md:w-[456px]">
      <h3 className="mb-[3px] text-[13px] font-bold text-custom-very-dark-gray md:text-[14px]">
        Feedback Title
      </h3>
      <p className="mb-[16px] text-[13px] text-custom-gray md:text-[14px]">
        Add a short, descriptive headline
      </p>
      <input
        type="text"
        value={enteredTitle}
        onChange={titleChangeHandler}
        onBlur={titleBlurHandler}
        className={`h-[48px] w-[279px] bg-custom-very-light-gray ${
          titleHasError ? " border-2 border-red-400" : ""
        } px-5 text-[13px] outline-none md:w-[456px]`}
      />
      {titleHasError && (
        <p className="text-body3 text-red-500">Please enter a valid title!</p>
      )}
    </div>
  );
};

export default FeedbackTitleInput;
