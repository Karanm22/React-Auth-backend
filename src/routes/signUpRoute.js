import { getDbConnection } from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid"
import { sendEmail } from "../util/sendEmail";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const db = getDbConnection("react-auth-db");

    const user = await db.collection("users").findOne({ email });

    if (user) {
      res.sendStatus(409);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const verificationString = uuid()

    const startingInfo = {
      hairColor: "",
      favouriteFood: "",
      bio: "",
    };

    const result = await db.collection("users").insertOne({
      email,
      passwordHash,
      info: startingInfo,
      isVerified: false,
      verificationString,
    });
    const { insertedId } = result;

    try{
        await sendEmail({
            to:email,
            from:"karanmishra224@gmail.com",
            subject:"Please verify your email",
            text:`
                Thanks for signing up ! To verify your email, click here:
                http://192.168.1.21:3000/verify-email/${verificationString}
            `,
            html:`
            <div>
            Thanks for signing up ! To verify your email,
            <a href="http://192.168.1.21:3000/verify-email/${verificationString}">
            Click here
            </a>
            
            </div>

            `
        })
    } catch(error){
        console.log(e)
        res.sendStatus(500);
    }

    jwt.sign(
      {
        id: insertedId,
        email,
        info: startingInfo,
        isVerified: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).json({ token });
      }
    );
  },
};
