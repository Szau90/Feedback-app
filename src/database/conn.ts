import { error } from "console"
import mongoose from "mongoose"

 const connectMongo = async () => {
   try {
    await mongoose.connect("mongodb+srv://szau90:FordMondeo12@cluster0.jfdopa9.mongodb.net/Product-feedback-app/product-requests?retryWrites=true&w=majority")
   }catch{
    return Promise.reject(error)
   }
}

export default connectMongo;