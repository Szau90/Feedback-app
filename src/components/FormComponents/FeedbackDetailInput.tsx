import { ChangeEvent } from "react";
const FeedbackDetailInput: React.FC<{
  enteredDescription: string;
  descriptionChangeHandler: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  descriptionBlurHandler: () => void;
  descriptionHasError: boolean;
}> = ({
  enteredDescription,
  descriptionBlurHandler,
  descriptionChangeHandler,
  descriptionHasError,
}) => {
  return (
    <div className="mt-[24px] h-[220px] w-[279px] md:w-[456px]">
      <h3 className="mb-[3px] text-[13px] font-bold text-custom-very-dark-gray md:text-[14px]">
        Feedback detail
      </h3>
      <p className="mb-[16px] text-[13px] text-custom-gray md:text-[14px]">
        Include any specific comments on what should be improved, added, etc.
      </p>
      <textarea
        value={enteredDescription}
        onChange={descriptionChangeHandler}
        onBlur={descriptionBlurHandler}
        className={`h-[120px] w-[279px] resize-none bg-custom-very-light-gray ${
          descriptionHasError && "border-2 border-red-500"
        } p-3 text-body3 font-normal text-custom-very-dark-gray outline-none md:w-[456px]  md:text-body2`}
      />
      {descriptionHasError && (
        <p className="text-body3 text-red-500">
          Please enter some description!
        </p>
      )}
    </div>
  );
};

export default FeedbackDetailInput;
