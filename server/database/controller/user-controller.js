import bcrypt from "bcrypt"
import User from "../../model/user.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Token from "../../model/Token.js"

dotenv.config()
export const signupUser = async (request, response) => {
    try {
        const salt = await bcrypt.genSalt(10)
        //  it can be simly written as 10
        const hashedPassword = await bcrypt.hash(request.body.password, salt)
        const user = {
            name: request.body.name,
            username: request.body.username,
            password: hashedPassword,
            country: request.body.country
        }


        // const user = { username: request.body.username, name: request.body.name, password: hashedPassword }

        const newUser = new User(user)
        console.log(newUser);
        await newUser.save();
        return response.json({ msg: "Sign Up Sucessfully", status: 200 })

    } catch (error) {
        return response.status(500).json({ msg: "error while signup" })

    }


}
// export const loginUser = async (req, response) => {
//     let user = await User.findOne({ username: req.body.username })
//     if (!user) {

//         return response.status(400).json({ msg: "username does not match" })
//     }
//     try {
//         //compare first what we have given in field then 2nd the backend password
//         console.log("heyyyyyy", user);
//         let match = await bcrypt.compare(req.body.password, user.password);
//         console.log(match);
//         if (match)
//         //give token process.env.ACCESS_SECRET_KEY (process.env.REFRESH_SECRET_KEY)

//         {
//             const accessToken = jwt.sign(user.toJSON(), "umerisgoodboy", { expiresIn: '15m' })
//             const refreshToken = jwt.sign(user.toJSON(), "umerisgood");
//             const newToken = new Token({ token: refreshToken })
//             await newToken.save();
//             response.status(200).json({
//                 accessToken: accessToken, refreshToken: refreshToken,
//                 name: user.name, username: user.username
//             })

//         } else {
//             return response.status(400).json({ msg: "password incorrect" })
//         }

//     } catch (error) {
//         return response.status(400).json({ error, msg: "error while loginnn" })

//     }

// }


export const loginUser = async (req, response) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return response.status(400).json({ msg: "Username does not match" });
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (match) {
            const accessToken = jwt.sign(user.toJSON(), "umerisgoodboy", { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(), "umerisgood");
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
            response.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
                name: user.name,
                username: user.username,
                country: user.country
            });
        } else {
            return response.status(400).json({ msg: "Password incorrect" });
        }
    } catch (error) {
        return response.status(400).json({ error, msg: "Error while logging in" });
    }
};

