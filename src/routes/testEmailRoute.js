import { sendEmail } from "../util/sendEmail";

export const testEmailRoute ={
    path:"/api/test-email",
    method:"post",
    handler:async(req,res)=>{
        try{
            await sendEmail({
                to:`shubhangvanjani@gmail.com`,
                from:'karanmishra224@gmail.com',
                subject:'Does this work??',
                text:'If you are reading this then yes its working!! YES!!!'
            });
            res.sendStatus(200)
        }
        catch(error){
            console.log(error)
            res.sendStatus(500);
        }
    }
}