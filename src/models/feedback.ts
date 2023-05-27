export interface Comments {
    id:number;
    content:string;
    user: User
    replies?: Replies[];
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

export interface ProductRequests {
    productRequests: Feedback
}

export interface Data {
    currentUser: User,
    productRequests: ProductRequests[],
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