import { MailtrapClient } from "mailtrap";
import {client,sender} from "../lib/mailTrap.js"
import { createWelcomeEmailTemplate,createCommentNotificationEmailTemplate  } from "./emailTemplate.js";



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
export const sendConnectionRequestEmail=async(
  recipientName,senderEmail,senderName,profileUrl
)=>{
  const recipient=[{email:senderEmail}]
  try {
    const response=await MailtrapClient.send({
      from:sender,
      to:recipient,
      subject:"Connection Accepted",
      html:createConnectionRequestEmailTemplate(recipientName,senderName,profileUrl),
      category:"Connection Acceptedt"
    })
    console.log("Connection Accepted email sent successfully ",response) 
  } catch (error) {
  console.log("Connection Accepted email not sent ",error)  
  throw error;
  }
}

