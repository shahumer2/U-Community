
import Post from "../../model/post.js"


export const createPost = async (request, response) => {
    try {
        const post = await new Post(request.body)
        console.log(request.body, "body");
        post.save();
        console.log(post, "newposttthaschuacasylc");
        response.status(200).json("post status successfully")
    } catch (error) {
        return response.status(500).json(error)

    }

}
export const getAllPosts = async (request, response) => {
    let posts;
    let category = request.query.category
    try {
        if (category) {
            posts = await Post.find({ categories: category })
        }
        else {
            posts = await Post.find({})
        }
        return response.status(200).json(posts)

    } catch (error) {
        return response.ststus(400).json({ msg: "error whi;le fetching posts" })

    }
}
export const getPostById = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id)
        return response.status(200).json(post)

    } catch (error) {
        return response.status(400).json({ msg: error.msg })

    }
}
export const updatePost = async (request, response) => {
    try {
        let post = await Post.findById(request.params.id)
        if (!post) {
            response.status(404).json({ msg: "update not handled" })
        }

        await Post.findByIdAndUpdate(request.params.id, { $set: request.body })
        return response.status(200).json({ msg: "post updated successfulyy" })

    } catch (error) {
        response.status(404).json({ msg: "update not done" })

    }


}
export const deletePost = async (request, response) => {
    try {
        let post = Post.findById(request.params.id)
        console.log(request.params.id, "iddddd");
        if (!post) {
            response.status(404).json({ msg: "cannot find the post" })
        }
        await post.deleteOne()
        return response.status(200).json({ msg: "post deleted successfully" })

    }

    catch (error) {
        return response.status(404).status({ msg: "error while deleting post" })

    }

}


// export const rating = async (request, response) => {

//     const { id } = await Post.findById(request.params.id)
//     const star =
// }