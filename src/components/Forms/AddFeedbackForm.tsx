import MainBtn from "@/components/Ui/buttons/MainBtn";
import { useRouter } from "next/router";
import useInput from "@/Hooks/use-input";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { addFeedback } from "@/store/feedbackSlice";
import FormTitle from "../FormComponents/FormTitle";
import FeedbackTitleInput from "../FormComponents/FeedbackTitleInput";
import FeedbackCategoryInput from "../FormComponents/FeedbackCategoryInput";
import FeedbackDetailInput from "../FormComponents/FeedbackDetailInput";

const AddFeedbackForm = () => {
  const dispatch = useAppDispatch();

  const category = useSelector((state: RootState) => state.ui.category);

  const router = useRouter();

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput((value) => value.trim() !== "");

  const formData = {
    id: Math.floor(Math.random() * 10000),
    category: category,
    description: enteredDescription,
    status: "suggestion",
    title: enteredTitle,
    comments: [],
    upvotes: 0,
    upvotedBy: [],
    isUpvoted: false,
  };

  const formIsValid = enteredTitleIsValid && enteredDescriptionIsValid;
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (formIsValid) {
      dispatch(addFeedback(formData));

      router.push("/");

      resetTitle()
      resetDescription()
    } else {
      return;
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex h-[708px] justify-center rounded-[10px] bg-white pt-10">
          <div className="w-[279px] md:w-[456px]">
            <FormTitle />
            <FeedbackTitleInput
              enteredTitle={enteredTitle}
              titleChangeHandler={titleChangeHandler}
              titleBlurHandler={titleBlurHandler}
              titleHasError={titleHasError}
            />
            <FeedbackCategoryInput />
            <FeedbackDetailInput
              enteredDescription={enteredDescription}
              descriptionChangeHandler={descriptionChangeHandler}
              descriptionBlurHandler={descriptionBlurHandler}
              descriptionHasError={descriptionHasError}
            />
            <div className="flex flex-col gap-[16px] md:flex-row-reverse">
              <div className="md:h-[44px] md:w-[144px]">
                <MainBtn
                  action={() => {}}
                  btnType="submit"
                  label="Add Feedback"
                  background="bg-custom-purple"
                />
              </div>
              <div className="md:h-[44px] md:w-[93px]">
                <MainBtn
                  action={() => {}}
                  label="Cancel"
                  background="bg-custom-very-dark-gray"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddFeedbackForm;
