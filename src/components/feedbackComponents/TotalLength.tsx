import { Comments } from "@/models/feedback";

const TotalLength:React.FC<{comments:Comments[]}> = ({comments}) => {

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
             <p className="ml-[9px] text-[13px] font-bold tracking-[-0.18px]">
          {totalLength}
        </p>
        </>
    )
};

export default TotalLength;