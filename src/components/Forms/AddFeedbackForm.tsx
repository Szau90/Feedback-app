import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store/store";
import { addFeedback } from "@/store/feedbackSlice";
import FormTitle from "../FormComponents/FormTitle";
import FeedbackTitleInput from "../FormComponents/FeedbackTitleInput";
import FeedbackCategoryInput from "../FormComponents/FeedbackCategoryInput";
import FeedbackDetailInput from "../FormComponents/FeedbackDetailInput";
import useInput from "@/Hooks/use-input";
import AddFormActions from "../FormComponents/AddFormActions";

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
  } = useInput((value) => value.trim() !== "", "");
  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput((value) => value.trim() !== "", "");

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

      resetTitle();
      resetDescription();
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
            <FeedbackCategoryInput currentCategory={"Feature"} />
            <FeedbackDetailInput
              enteredDescription={enteredDescription}
              descriptionChangeHandler={descriptionChangeHandler}
              descriptionBlurHandler={descriptionBlurHandler}
              descriptionHasError={descriptionHasError}
            />
            <AddFormActions
              resetTitle={resetTitle}
              resetDescription={resetDescription}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddFeedbackForm;
