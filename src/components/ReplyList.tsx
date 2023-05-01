import { Replies } from "@/models/feedback";

const ReplyList:React.FC<{replies: Replies[]}> = ({replies}) => {

    const noreply = replies  === undefined
const allReplies =  !noreply && replies.map((reply, index) => (
                
    <>
    <li key={index}>{reply.replyingTo}</li>
    <li key={index}>{reply.content}</li>
    </>
))

    return (
        <ul>
            { allReplies}
        </ul>
    )
};

export default ReplyList;