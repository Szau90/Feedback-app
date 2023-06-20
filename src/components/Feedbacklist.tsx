import { Comments } from "@/models/feedback";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "@/models/feedback";
import { RootState, useAppDispatch } from "@/store/store";
import { fetchFeedback, setUpvotes } from "@/store/feedbackSlice";
import { useSelector } from "react-redux";
const FeedbackList: React.FC<{
  id: number;
  title: string;
  comments: Comments[];
  category: string;
  description: string;
  upvotes: number;
  status: string;
  isUpvoted: boolean;
}> = (props) => {
  const { id, title, comments, category, description, upvotes, status, isUpvoted } = props;

const dispatch = useAppDispatch()
const [isUpvoted1, setIsUpvoted] = useState(isUpvoted)

useEffect(()=> {
  dispatch(fetchFeedback())
 
},[])


  

  
const feedB = useSelector((state:RootState)=> state.feedback.feedback)



const upvote = feedB.find(f => f.id === id)?.upvotes


const user= {
  id:998,
  image: "/assets/user-images/image-zena.jpg",
  name: "Zena Kelley",
  username: "velvetround",
}




  const router = useRouter();

  const clickHandler = () => {
    router.push(`/${id}`);
  };

  const handleUpvote = async (user:User, feedbackId:number) => {
    try {
    const res = await fetch(`/api/upvote/${feedbackId}`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (res.ok) {
      await res.json();
      dispatch(setUpvotes({ feedbackId, userId: user.id }));

      setIsUpvoted(!isUpvoted1)
 
    }else{
      throw new Error('you alredy upvoted this feedback!')
    }
    
  

   } catch (error) {
    console.log(error)
   }
  }

  const borderColor =
    status === "in-progress"
      ? " border-t-4 border-custom-purple"
      : status === "live"
      ? " border-t-4 border-custom-light-blue"
      : status === "planned"
      ? " border-t-[6px] rounded-l border-custom-light-orange"
      : "";

  const icon = isUpvoted1 ? "/assets/shared/icon-arrow-up-white.svg" :"/assets/shared/icon-arrow-up-blue.svg"    
  const roadmap = router.pathname === "/roadmap";
  const border = roadmap ? ` ${borderColor}` : "";

  let commentsLength = comments ? comments.length : 0;
  let replyLength = 0;

  if (comments) {
    for (let i = 0; i < commentsLength; i++) {
      if (comments[i].replies) {
        replyLength += comments[i].replies.length;
      }
    }
  }

  const totalLength = commentsLength + replyLength;



  return (
    <>
      <div
       
        className={`${border}  mt-[20px] w-[327px]  xl:h-[151px] xl:w-[825px]`}
      >
        <li className=" box-border flex h-[200px] w-[327px] items-center justify-center rounded-lg border-0 bg-white md:h-[151px] md:w-[689px]  xl:w-[825px]">
          <div className="flex flex-col md:h-[95px] md:w-[625px] md:flex-row md:justify-between xl:w-[761px]">
            <div className={`hidden ${isUpvoted1 ? 'bg-custom-dark-blue': 'bg-custom-very-light-gray' } h-[32px] w-[69px] items-center justify-around rounded-[10px] md:flex md:h-[53px] md:w-[40px] md:flex-col`}>
            
              <button type="button" onClick={() => handleUpvote(user, id)} className={`text-[13px] ${isUpvoted1? 'text-white': ''} font-bold tracking-[-0.18px] flex items-center flex-col gap-2`}>
              <Image
                src={icon}
                width={10}
                height={7}
                alt="arrow up"
                style={{ objectFit: "contain" }}
              />
                {upvote}
              </button>
            </div>
            <div  className="flex-col  md:w-[476px] xl:mr-[120px]">
              { roadmap &&
                <div className="flex flex-row items-center gap-2 h-[19px] mb-[16px]">
                  <div className="h-[8px] w-[8px] rounded-full bg-custom-light-orange"></div>
                  <p className="text-[13px] leading-[19px] capitalize text-custom-gray ">{status}</p>
                </div>
              }
              <h1 className="w-[278px] text-[13px] font-bold tracking-[-0.18px] text-custom-very-dark-gray md:w-max  md:text-h3">
                {title}
              </h1>
              <p className="font-regular mt-[9px] w-[278px] text-[13px] text-[#647196] md:w-max md:text-body1 ">
                {description}
              </p>
              <p className="mt-[9px] w-max rounded-lg bg-custom-very-light-gray px-3 py-[5.5px] text-body3 capitalize text-custom-dark-blue ">
                {category}
              </p>
            </div>
            <div className="mt-[9px] flex items-center justify-between">
              <div className=" inline-flex  h-[32px] w-[69px] items-center justify-around rounded-[10px] bg-custom-very-light-gray md:hidden">
                <Image
                  src={"/assets/shared/icon-arrow-up.svg"}
                  width={10}
                  height={7}
                  alt="arrow up"
                  style={{ objectFit: "contain" }}
                />
                <p className="text-[13px] font-bold tracking-[-0.18px]">
                  {upvotes}
                </p>
              </div>
              <div  onClick={clickHandler} className="inline-flex cursor-pointer">
                {" "}
                <Image
                  src={"/assets/shared/icon-comments.svg"}
                  width={18}
                  height={16}
                  style={{ objectFit: "contain" }}
                  alt="comments"
                />
                <p  className="ml-[9px] text-[13px] font-bold tracking-[-0.18px]">
                  {totalLength}
                </p>
              </div>
            </div>
          </div>
        </li>
      </div>
    </>
  );
};

export default FeedbackList;
