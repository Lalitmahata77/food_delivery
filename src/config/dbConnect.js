import mongoose from "mongoose";

const connectMongoDb = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDb connect : ${connect.connection.host}`);
        
    } catch (error) {
        console.log(`MongoDb error : ${error.message}`);
        process.exit(1)
    }
}

export default connectMongoDb