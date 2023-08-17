import mongoose from "mongoose"


export const Connection = async (username, password) => {
    // const URL = `mongodb+srv://${username}:${password}@blog-app.fdgtivh.mongodb.net/?retryWrites=true&w=majority`
    const URL = `mongodb+srv://shahumer:Umer123@blog-app.fdgtivh.mongodb.net/?retryWrites=true&w=majority`
    try {

        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log("database connected");

    } catch (error) {
        console.log(error);

    }
}