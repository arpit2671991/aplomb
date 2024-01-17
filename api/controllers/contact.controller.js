import nodemailer from "nodemailer";
import Contact from "../models/Contact.js";

export const send = async (req, res, next) => {
  const { fullName, email, mobile, message } = req.body;
  try {
    const contactDetails = await Contact.create(req.body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "",
        pass: "",
      },
    });
    const mailOptions = {
      from: "",
      to: "",
      subject: "Enquiry",
      text: `Name: ${fullName}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`,
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
