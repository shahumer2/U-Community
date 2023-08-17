import mongoose from "mongoose"

const PostSchema = mongoose.Schema({

    title: {
        type: "String",
        required: "true",
        unique: "true"
    },
    description: {
        type: "String",
        required: true
    },
    picture: {
        type: "String",
        required: true

    },
    username: {
        type: "String",

    },
    categories: {
        type: "String",
        required: true
    },
    createddate: {
        type: Date,

    },
    name: {
        type: "String"
    },
    country: {
        type: "String"
    },
    // rating: [

    //     {
    //         star: Number,
    //         postBy: {
    //             type: mongoose.Schema.Types.ObjectId, ref: " User"
    //         },
    //     },
    // ],
    // totalRating: {
    //     type: "String",
    //     default: 0
    // }

})
const post = mongoose.model("post", PostSchema)
export default post