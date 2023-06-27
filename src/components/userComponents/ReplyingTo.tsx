import { Replies } from "@/models/feedback";

const ReplyingTo: React.FC<{ reply: Replies }> = ({ reply }) => {
  return (
    <div className="text-[13px] text-custom-gray md:ml-[71px] md:w-[508px] md:text-[15px] xl:w-[550px]">
      <span className="font-bold text-custom-purple md:text-[15px]">
        @{reply.replyingTo} {""}
      </span>
      {reply.content}
    </div>
  );
};

export default ReplyingTo;
