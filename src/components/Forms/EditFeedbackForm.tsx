import Dropdown from "@/components/Ui/Dropdown";
import MainBtn from "@/components/Ui/buttons/MainBtn";
import Feedback, { Comments } from "@/models/feedback";
import { useRouter } from "next/router";
import { useState } from "react";
import useInput from "@/Hooks/use-input";
import { json } from "stream/consumers";

const EditFeedbackForm: React.FC<{
  title: string;
  description: string;
  status: string;
  category: string;
  id:number;
  comments: Comments[];
  upvotes: number;
}> = ({ title, description, status, category, id, comments,upvotes }) => {
  const router = useRouter();
  
  const [selectedCategory, setSelectedCategory] = useState<string>("Feature");
  const [selectedStatus, setSelectedStatus] = useState<string>("Suggestion");

  const handleCategoryChange = (option: string) => {
    setSelectedCategory(option);
  };
  const handleStatusChange = (option: string) => {
    setSelectedStatus(option);
  };

  const editFeedbackHandler = async (updateData: Feedback) => {
    const res = await fetch(`/api/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    await res.json();
  }

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetName,
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
    id:id,
    category: selectedCategory,
    description: enteredDescription,
    status: selectedStatus,
    title: enteredTitle,
    comments: comments,
    upvotes:upvotes,
  }
  

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault()

    editFeedbackHandler(formData)

  };

  const handleDelete = async (id:number) => {
    try {
      const res = await fetch(`/api/${id}`, {
        method: 'DELETE',
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mt-[24px] h-[105px] w-[279px] md:w-[456px]">
          <h3 className="mb-[3px] text-[13px] font-bold text-custom-very-dark-gray md:text-[14px]">
            Feedback Title
          </h3>
          <p className="mb-[16px] text-[13px] text-custom-gray md:text-[14px]">
            Add a short, descriptive headline
          </p>
          <input
            type="text"
            defaultValue={title}
            value={enteredTitle}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
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
              placeHolder={`${category}`}
              color="text-custom-very-dark-gray"
              background="bg-custom-very-light-gray"
              options={["Feature", "UI", "UX", "Enhancement", "Bug"]}
              padding="px-[15px]"
              position="top-[60px] left-0"
              width="w-[279px] md:w-[456px]"
              height=" max-h-[250px]"
              selectedValue={selectedCategory}
              handleChange={handleCategoryChange}
            />
          </div>
        </div>
        <div className="mt-[24px] h-[105px] w-[279px] md:w-[456px]">
          <h3 className="mb-[3px] text-[13px] font-bold text-custom-very-dark-gray md:text-[14px]">
            Update status
          </h3>
          <p className="mb-[16px] text-[13px] text-custom-gray md:text-[14px]">
            Change feature state
          </p>
          <div className="h-[48px] w-[279px] md:w-[456px]">
            <Dropdown
              placeHolder={`${status}`}
              color="text-custom-very-dark-gray"
              background="bg-custom-very-light-gray"
              options={["Suggestion", "Planned", "In-Progress", "Live"]}
              padding="px-[15px]"
              position="top-[60px] left-0"
              width="w-[279px] md:w-[456px]"
              height=" max-h-[250px]"
              selectedValue={selectedStatus}
              handleChange={handleStatusChange}
            />
          </div>
        </div>
        <div className="mt-[24px] h-[220px] w-[279px] md:w-[456px]">
          <h3 className="mb-[3px] text-[13px] font-bold text-custom-very-dark-gray md:text-[14px]">
            Feedback detail
          </h3>
          <p className="mb-[16px] text-[13px] text-custom-gray md:text-[14px]">
            Include any specific comments on what should be improved, added,
            etc.
          </p>
          <textarea
            defaultValue={description}
            value={enteredDescription}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
            className="h-[120px] w-[279px] resize-none bg-custom-very-light-gray p-3 text-body3 font-normal text-custom-very-dark-gray outline-none md:w-[456px]  md:text-body2"
          />
        </div>
        <div className="flex flex-col gap-[16px] md:flex-row-reverse md:justify-between">
          <div className="flex  flex-col gap-[16px] md:flex-row-reverse">
            <div className="md:h-[44px] md:w-[144px]">
              <MainBtn
                action={() => {}}
                label="Save Changes"
                background="bg-custom-purple"
                btnType="submit"
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
          <div className="md:h-[44px] md:w-[93px]">
            <MainBtn
              action={() => handleDelete(id)}
              label="Delete"
              background="bg-[#D73737]"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default EditFeedbackForm;
