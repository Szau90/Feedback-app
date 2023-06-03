export interface Comments {
    id:number;
    content:string;
    user: User
    replies: Replies[];
    showReply: boolean;
}

export interface User {
        image:string;
        name:string;
        username:string;
}
export interface Replies {
    content:string;
    replyingTo:string;
    user: User;
}


interface Feedback {
    
    
        id: number;
        title: string;
        category: string;
        upvotes:number;
        status:string;
        description: string;
        comments: Comments[];

       
    }

export default Feedback;