import {v4 as uuid} from "uuid"
import { sendEmail } from "../util/sendEmail"
import { getDbConnection } from "../db"

export const forgotPasswordRoute={
    path:"/api/forgot-password/:email",
    method:"put",
    handler:async(req,res)=>{
        const {email} = req.params;

        const db = getDbConnection('react-auth-db');

        const passwordResetCode = uuid();

        const {result} = await db.collection('users').updateOne({email},{$set:{passwordResetCode}});

        if(result.nModified > 0){
            try{
                await sendEmail({
                    to:email,
                    from:"karanmishra224@gmail.com",
                    subject:"Password Reset",
                    text:'To reset your password click on the link below',
                    html:`
                        <div>
                            To reset your password, <a href="http://192.168.1.21:3000/reset-password/${passwordResetCode}">click here</a>.
                        </div>
                    `
                })
            }
            catch(e){
                res.sendStatus(500);
            }
        }

        res.sendStatus(200);
    }
}