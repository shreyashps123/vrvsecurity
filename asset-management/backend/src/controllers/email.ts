import {createTransport} from "nodemailer";
import {host, port} from "../config/mailhog";

const emailHeaderAndBody={
    mailFrom:  "noreply@noovosoft.com",
    subject: "Your Login Credentials",
}

const sendMail = async(mailOptions:object)=>{
    const transporter = createTransport({
        host: host,
        port: port
    })

    transporter.sendMail(mailOptions,(err)=>{
        if (err) {
            console.log(err);
            console.log( "Internal server error");
        }
        console.log('Sent!!');
    })
}
const createMessage = (password : string)=>{
    return `<h3 style="color: red">Warning: Do not share your credentials!!! </h3>
<h4><span style="font-weight: bold">Password: </span>${password}</h4><br><br>
<h4><span style="font-weight: bold">Note: </span>Change the password once you log in</h4>`
}
export const sendCredentials = async(email:string,password:string)=>{
    try {
        const {mailFrom, subject} = emailHeaderAndBody;
        const mailContent = {
            from: mailFrom,
            to: email,
            subject: subject,
            html: createMessage(password)
        };
        await sendMail(mailContent);
    }catch(err){
        console.log("error while sending mail to user");
        console.log(err);
    }
}