import Dropdown from "@/components/Ui/Dropdown";
import MainBtn from "@/components/Ui/buttons/MainBtn";
import { useState } from "react";
import { useRouter } from "next/router";
import Feedback from "@/models/feedback";
import useInput from "@/Hooks/use-input";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { setCategory } from "@/store/uiSlice";


const AddFeedbackForm = () => {

  const dispatch = useAppDispatch()

  const category = useSelector((state:RootState)=> state.ui.category)
  const showDropdown = useSelector((state:RootState) => state.ui.showDropdownMenu )

    const router = useRouter();

    

    const onCategoryChange = (option:string) => {
      dispatch(setCategory(option))
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
        id:Math.floor(Math.random()*10000),
        category: category,
        description: enteredDescription,
        status: "suggestion",
        title: enteredTitle,
        comments: [],
        upvotes:0,
      }
      const addFeedback = async (feedback:Feedback) => {
       
        const res = await fetch("/api/feedback", {
          method: "POST",
          body: JSON.stringify(feedback),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (res.ok) {
          await res.json()
        }else {
          throw new Error('Cant add new feedback')
        }
    
       
      }
    
      const handleSubmit = (event:React.FormEvent) => {
        event.preventDefault()
    
        addFeedback(formData)

        router.push('/')
      
       
      }
    return(<>
     <form onSubmit={handleSubmit}>
            <div className="flex h-[708px] justify-center rounded-[10px] bg-white pt-10">
              <div className="w-[279px] md:w-[456px]">
                <h3 className="text-h3 text-custom-very-dark-gray md:text-h1">
                  Create New Feedback
                </h3>
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
                      placeHolder={"Feature"}
                      color="text-custom-very-dark-gray"
                      background="bg-custom-very-light-gray"
                      options={["Feature", "UI", "UX", "Enhancement", "Bug"]}
                      padding="px-[15px]"
                      position="top-[60px] left-0"
                      width="w-[279px] md:w-[456px]"
                      height=" max-h-[250px]"
                      handleValueChange={onCategoryChange}
                      selectedValue={category}
                      showDropdown={showDropdown}
                    
                    />
                  </div>
                </div>
                <div className="mt-[24px] h-[220px] w-[279px] md:w-[456px]">
                  <h3 className="mb-[3px] text-[13px] font-bold text-custom-very-dark-gray md:text-[14px]">
                    Feedback detail
                  </h3>
                  <p className="mb-[16px] text-[13px] text-custom-gray md:text-[14px]">
                    Include any specific comments on what should be improved,
                    added, etc.
                  </p>
                  <textarea 
                  value={enteredDescription}
                  onChange={descriptionChangeHandler}
                  onBlur={descriptionBlurHandler}
                  className="h-[120px] w-[279px] resize-none bg-custom-very-light-gray p-3 text-body3 font-normal text-custom-very-dark-gray outline-none md:w-[456px]  md:text-body2" />
                </div>
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
    
    </>)
};

export default AddFeedbackForm;