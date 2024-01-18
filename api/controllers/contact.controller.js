import nodemailer from "nodemailer";
import Contact from "../models/Contact.js";

export const send = async (req, res, next) => {
  const { fullName, email, mobile, message } = req.body;
  try {
    const contactDetails = await Contact.create(req.body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "joopanwar1@gmail.com",
        pass: "zgtc iabb ebhl hege",
      },
    });
    const mailOptions = {
      from: "joopanwar1@gmail.com",
      to: "arpitdamami@gmail.com",
      subject: "Enquiry",
      // text: `Name: ${fullName}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`,
      html: `<body class="bg-gray-100">
      <header class="w-full bg-blue-500">
      <nav>
      <h1 class="text-sm font-semibold">You have recieved an inquiry from ${fullName}</h1>
      <p class="text-xs text-gray-500">Please call back</p>
      </nav>
      </header/>
      <main>
      <div >
      <table >
      <tr>
        <th >Name:</th>
        <td>${fullName}</td>
      </tr>
      <tr>
        <th>Email:</th>  
        <td>${email}</td>      
      </tr>  
      <tr>
        <th>Phone:</th>
        <td>${mobile}</td>
      </tr>
      <tr>
      <th>Message:</th>  
      <td>${message}</td>      
    </tr> 
    </table>
        
      </div>
      </main>
     
      </body>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("Email Sent:" + info.response);
        res.status(200).send("Email sent successfully");
      }
    });
    return res.status(201).json(contactDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
