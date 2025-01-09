import {client,sender} from "../lib/mailTrap.js"
import { createWelcomeEmailTemplate } from "./emailTemplate.js";



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