import mongoose from "mongoose";

export default async function dbConnect (){
    try{
        const db = mongoose.connect(process.env.MONGO_URL)
        return({ db })
    } catch (error) {
        console.log(`ERROR CONNECTING TO DATABASE: ${error}`);
    }
}
