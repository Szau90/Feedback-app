export interface Comments {
    id:number;
    content:string;
    user: {
        image:string;
        name: string;
        username:string;
    };
    replies: Replies[];
}
export interface Replies {
    content:string;
    replyingTo:string;
    user: {
        image:string;
        name:string;
        username:string;
          };
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