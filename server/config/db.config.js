import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const connectToDb = async () => {
    await mongoose.connect(process.env.MONGOOSE_URI)
    .then((conn) => {console.log(`Database connected: ${conn.connection.host}`);})
    .catch((err) => {console.log(`Error in connected db: ${err.message}`);})
}

export default connectToDb;