import { Comments } from "@/models/feedback";
import ReplyList from "./ReplyList";

const CommentList:React.FC<{comments: Comments[]}> = ({comments}) => {

    
    return (
        <ul>
            {comments.map((comment, index) => (
                
                <>
                <li  key={index}>{comment.id}</li>
                <li key={index}>{comment.content}</li>
               <ReplyList key={index} replies={comment.replies} />
                </>
            ))}
        </ul>
    )
};

export default CommentList;