// import mongoose from "mongoose";

// // Replace the connection string with your actual MongoDB URL
// const mongoURI = "mongodb+srv://shahumer:Umer123@blog-app.fdgtivh.mongodb.net/?retryWrites=true&w=majority";

// // Establish the MongoDB connection
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("MongoDB connected!");
//     })
//     .catch((err) => {
//         console.error("MongoDB connection error:", err);
//     });

// import express from 'express';
// import mongoose from 'mongoose';


// // Step 2: Create the express app
// const app = express();

// // Step 3: Establish the MongoDB connection using mongoose
// mongoose.connect('mongodb+srv://shahumer:Umer123@blog-app.fdgtivh.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })




import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage"

// in grid fs storage we have to gove it a url parameter tat is mongo db url
const storage = new GridFsStorage({
    url: `mongodb+srv://shahumer:Umer123@blog-app.fdgtivh.mongodb.net/?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        console.log(file, "filessssssssssssssssss");
        const match = ["image/png", "image/jpg"];
        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-blog-${file.originalname}`

        }
        return {

            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`,


        }


    }
})
export default multer({ storage })







