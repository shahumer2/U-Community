import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
export const authenticateToken = (request, response, next) => {
    const authheader = request.headers["authorisation"]
    // here token is concatenated with bearer
    const token = authheader && authheader.split(' ')[1];
    if (token === "null") {
        return response.status(401).json({ msg: "token is missing" })
    }
    jwt.verify(token, "umerisagoodboy", (user, error) => {
        if (error) {
            return response.status(403).json({ msg: "invalid token" })
        }
        request.user = user
        // now middle ware to function by next
        next();

    })
}
