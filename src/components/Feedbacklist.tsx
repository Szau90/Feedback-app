import  { Comments } from "@/models/feedback";
import CommentList from "./CommentList";

const FeedbackList:React.FC<{
    id:number;
    title:string;
    comments:Comments[];
    category:string;
    description: string;
    upvotes:number;
    
}> = (props) => {

    

    const {id, title, comments, category , description, upvotes} = props;


    const noComments = comments === null
    

    // { !noComments && <CommentList comments={comments} />}


    return(<>
    <ul className="container">
        <li className="box-border h-151 w-825 p-32 border-0 bg-white m-2 rounded-lg">
            <div className="flex flex-row items-center justify-between">
            <div>upvotes: {upvotes}</div>
            <div className="flex flex-col">
             <h1>{title}</h1>
             <p>{description}</p>
             <p>{category}</p>
            </div>
            <div> comments:{ noComments? 0 : comments.length}</div>
            </div>
        
        </li>
    </ul>
    
    </>)
};

export default FeedbackList;