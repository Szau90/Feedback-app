import { Comments, Replies } from "@/models/feedback";
import Image from "next/image";
import Link from "next/link";
import React,{useState} from "react";
import MainBtn from "./Ui/buttons/MainBtn";

const ReplyList: React.FC<{ replies: Replies[]; commentIndex:number;comments:Comments[]; feedbackId:number; actualCommentId:number; }> = ({ replies, commentIndex, comments, feedbackId, actualCommentId }) => {
  const [comment, setComment] = useState<Comments[]>([...comments]);
  const [enteredReply, setEnteredReply] = useState('')
  const [replyingTo, setReplyingTo] = useState('')
  const [commentId, setCommentId] = useState(0)
  const noreply = replies === undefined;

  const sendReply = async (reply: Replies, feedbackId: number, replyId: number) => {
    const res = await fetch(`/api/replies/${feedbackId}/${replyId}`, {
      method: 'POST',
      body: JSON.stringify(reply),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  const replyChangeHandler = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    setEnteredReply(event.target.value)
    
  }
  const handleReply = (commentId: number,replyId: number) => {
    const updatedComments:Comments[] = comments.map((comment) => {
   
      if (comment.id === commentId) {
      comment.replies.map((reply)=> {
        if (reply.id === replyId) {
          return {
            ...reply,
            showReply: true, // Beállítjuk a válasz input láthatóságát true-ra
          };
        }
        return reply;
      })
        
      }
      return comment;
    })

    setComment(updatedComments);
  };

  const submitHandler = (event:React.FormEvent) => {

    event.preventDefault()

    const reply: Replies = {
      id:Math.floor(Math.random()* 1000),
      content: enteredReply,
      replyingTo: replyingTo,
      user: {
        image: "/assets/user-images/image-zena.jpg",
        name: "Zena Kelley",
        username: "velvetround"
      },
      showReply:false,
    };
  
    const updatedComment = comment.map((comment, id) => {
      
      if (comment.id === id) {
        return {
          ...comment,
          replies: [...comment.replies, reply],
          showReply: false, // Beállítjuk a válasz input láthatóságát false-ra
        };
        
      }
      return comment;
    });

    setComment(updatedComment)
    sendReply(reply, feedbackId, commentId)
  }

  const allReplies =
    !noreply &&
    replies.map((reply, index) => (
      <React.Fragment key={index}>
        { index === 0 && commentIndex !==0 && <div className="w-[1px] h-[216px] absolute  inset-x-0 md:-top-20 md:left-5 bg-custom-gray opacity-20 md:h-[267px]"></div>}
        <div
          className={`flex h-[180px] w-[280px] flex-col mb-[16px] items-end md:items-start justify-start md:w-[578px] xl:w-[714px] `}
        >
          <div className="w-[256px] md:w-[578px] xl:w-[714px]">
            <div className="mb-[16px] flex ">
              <li>
                <Image
                  src={reply.user.image}
                  width={40}
                  height={40}
                  alt="user image"
                  className="mr-[16px] rounded-full md:mr-[32px]"
                />
              </li>
              <div className=" mr-[71px] w-[120px] md:mr-[390px] md:w-[130px] xl:mr-[478px]">
                <li className="text-body3 text-custom-very-dark-gray md:text-h4">
                  {reply.user.name}
                </li>
                <li className="text-[13px] text-custom-gray md:text-[14px]">
                  @{reply.user.username}
                </li>
              </div>
              <button
                onClick={()=> handleReply(actualCommentId, reply.id)}
                className="text-[13px] font-bold text-custom-dark-blue "
              >
                Reply
              </button>
            </div>
            <li className="text-[13px] text-custom-gray md:ml-[71px] md:w-[508px] md:text-[15px] xl:w-[550px]">
              <span className="font-bold text-custom-purple md:text-[15px]">
                @{reply.replyingTo} {""}
              </span>
              {reply.content}
            </li>
            {reply.showReply && (
                    <form
                      onSubmit={submitHandler}
                      className="ml-[72px] flex  flex-row  gap-[16px]"
                    >
                      <textarea 
                      className="resize-none rounded-[10px] border border-custom-dark-blue bg-custom-very-light-gray  text-body1 font-normal text-custom-very-dark-gray outline-none xl:h-[80px] xl:w-[556px]"
                      onChange={replyChangeHandler}
                      />
                      <div className="w-[117px]">
                        <MainBtn
                          btnType="submit"
                          background="bg-custom-purple"
                          action={() => {}}
                          label="Post Reply"
                        />
                      </div>
                    </form>
                  )}
          </div>
        </div>
      </React.Fragment>
    ));

  return (
    <>
      <ul className="mt-[24px] !border-none md:flex  md:flex-col md:items-end relative">
        {allReplies}
      </ul>
    </>
  );
};

export default ReplyList;
