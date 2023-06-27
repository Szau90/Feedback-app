import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store/store";
import { Comments } from "@/models/feedback";
import useInput from "@/Hooks/use-input";
import FeedbackTitleInput from "../FormComponents/FeedbackTitleInput";
import FeedbackCategoryInput from "../FormComponents/FeedbackCategoryInput";
import FeedbackDetailInput from "../FormComponents/FeedbackDetailInput";
import EditFormActions from "../FormComponents/EditFormActions";
import { editFeedback } from "@/store/feedbackSlice";
import FeedbackStatusInput from "../FormComponents/FeedbackStatusInput";

const EditFeedbackForm: React.FC<{
  title: string;
  description: string;
  status: string;
  category: string;
  id: number;
  comments: Comments[];
  upvotes: number;
  upvotedBy: number[];
  isUpvoted: boolean;
}> = ({
  title,
  description,
  status,
  category,
  id,
  comments,
  upvotes,
  upvotedBy,
  isUpvoted,
}) => {
  const router = useRouter();

  const selectedStatus = useSelector((state: RootState) => state.ui.status);
  const selectedCategory = useSelector((state: RootState) => state.ui.category);

  const dispatch = useAppDispatch();

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput((value) => value.trim() !== "", title);
  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput((value) => value.trim() !== "", description);

  const formData = {
    id: id,
    category: selectedCategory,
    description: enteredDescription,
    status: selectedStatus,
    title: enteredTitle,
    comments: comments,
    upvotes: upvotes,
    upvotedBy: upvotedBy || [],
    isUpvoted: isUpvoted || false,
  };

  const formIsValid = enteredTitleIsValid && enteredDescriptionIsValid;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (formIsValid) {
      dispatch(editFeedback({ updatedFeedbackData: formData, id: id }));
      resetTitle();
      resetDescription();

      router.push("/");
    } else {
      return;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FeedbackTitleInput
          enteredTitle={enteredTitle}
          titleChangeHandler={titleChangeHandler}
          titleBlurHandler={titleBlurHandler}
          titleHasError={titleHasError}
        />
        <FeedbackCategoryInput currentCategory={category} />
        <FeedbackStatusInput status={status} />
        <FeedbackDetailInput
          enteredDescription={enteredDescription}
          descriptionChangeHandler={descriptionChangeHandler}
          descriptionBlurHandler={descriptionBlurHandler}
          descriptionHasError={descriptionHasError}
        />
        <EditFormActions
          id={id}
          resetTitle={resetTitle}
          resetDescription={resetDescription}
        />
      </form>
    </>
  );
};

export default EditFeedbackForm;
