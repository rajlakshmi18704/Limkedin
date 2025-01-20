import { MailtrapClient } from "mailtrap";
import {mailtrapClient ,sender} from "../lib/mailTrap.js"
import { createWelcomeEmailTemplate,createCommentNotificationEmailTemplate ,	
  createConnectionAcceptedEmailTemplate} from "./emailTemplate.js";



export const sendWelcomeEmail=async (email,name,profileUrl)=>{
const recipient=[{email}]
try {
 const response=await client.send({
    from:sender,
    to: recipient,
    subject: "Welcome to LinkedIn",
  html: createWelcomeEmailTemplate(name,profileUrl),
    category: "Welcome",

 })  
 console.log("Welcome Email sent successfully",response) 
} catch (error) {
  throw error;  
}
}
export const sendCommentNotificationEmail=async(
  recipientEmail,recipientName,postUrl,commentContent,commentorName
)=>{
  const recipient=[{email:recipientEmail}]
  try {
    const response=await MailtrapClient.send({
      from:sender,
      to:recipient,
      subject:"New comment on your post",
      html:createCommentNotificationEmailTemplate(recipientName,commentorName,postUrl,commentContent),
      category:" comment_Notification"
    })
    console.log("Comment notification email sent successfully ",response) 
  } catch (error) {
  console.log("Comment Notification Email not sent ",error)  
  throw error;
  }
}
export const sendConnectionAcceptedEmail = async (senderEmail, senderName, recipientName, profileUrl) => {
	const recipient = [{ email: senderEmail }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: `${recipientName} accepted your connection request`,
			html: createConnectionAcceptedEmailTemplate(senderName, recipientName, profileUrl),
			category: "connection_accepted",
		});
	} catch (error) {}
};
