import { Comments, Replies } from "@/models/feedback";
import ReplyList from "./ReplyList";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import MainBtn from "./Ui/buttons/MainBtn";

const CommentList: React.FC<{ comments: Comments[], feedbackId: number; }> = ({ comments, feedbackId }) => {
  const [comment, setComment] = useState<Comments[]>([...comments]);
  const [enteredReply, setEnteredReply] = useState('')
  const [replyingTo, setReplyingTo] = useState('')
  const [commentId, setCommentId] = useState(0)

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

  const hasComment = comments !== undefined;

  const handleReply = (commentId: number) => {
    const updatedComments = comments.map((comment) => {
   
      if (comment.id === commentId) {
        setReplyingTo(comment.user.username)
        setCommentId(comment.id)
        return {
          ...comment,
          showReply: true, // Beállítjuk a válasz input láthatóságát true-ra
        };
      }
      return comment;
    });

    setComment(updatedComments);
  };

  const sendReply = async (reply: Replies, feedbackId: number, commentId: number) => {
    const res = await fetch(`/api/replies/${feedbackId}/${commentId}`, {
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
  
    const updatedComment = comments.map((comment, id) => {
      
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
  return (
    <ul className="mt-[24px] rounded-[10px] bg-white ">
      <h3 className="my-[24px] ml-[24px] text-h3 text-custom-very-dark-gray">
        {totalLength} Comments
      </h3>
      {hasComment &&
        comment.map((comment, index) => (
          <React.Fragment key={index}>
            <div
              key={index}
              className="flex w-[327px] flex-col items-center md:w-[689px] xl:w-[825px]"
            >
              <div className="block w-[280px]  items-center  md:w-[625px] xl:w-[761px]">
                <div
                  className={`h-fit w-[280px] md:w-[625px] xl:w-[761px] ${
                    index === 0 ? "first:border-b  md:first:h-[155px]" : ""
                  }`}
                >
                  <div className="mb-[16px] flex justify-center  ">
                    <li>
                      <Image
                        src={comment.user.image}
                        width={40}
                        height={40}
                        alt="user image"
                        className="mr-[16px] rounded-full md:mr-[32px]"
                      />
                    </li>
                    <div className=" mr-[71px] w-[120px] md:mr-[390px] md:w-[130px] xl:mr-[525px] ">
                      <li className="text-body3 text-custom-very-dark-gray md:text-h4">
                        {comment.user.name}
                      </li>
                      <li className="text-[13px] text-custom-gray md:text-[14px]">
                        @{comment.user.username}
                      </li>
                    </div>
                    <button
                      onClick={() => handleReply(comment.id)}
                      className="text-[13px] font-bold text-custom-dark-blue "
                    >
                      Reply
                    </button>
                  </div>
                  <li className="pb-5 text-[13px] text-custom-gray md:ml-[72px] md:w-[553px] md:text-[15px] xl:w-[594px] ">
                    {comment.content}
                  </li>
                  {comment.showReply && (
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
                <ReplyList
                  key={index}
                  replies={comment.replies}
                  commentIndex={index}
                  comments={comments}
                  feedbackId={feedbackId}
                  actualCommentId={comment.id}
                />
              </div>
            </div>
          </React.Fragment>
        ))}
    </ul>
  );
};

export default CommentList;
