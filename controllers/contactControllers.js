const Contact = require("../models/Contact");

const { Resend } = require("resend");
const apiKey = `re_RjS3uXXC_8jALAEC5ycq5QX4PbLDSJnyp`;
const resend = new Resend(apiKey);

exports.create = async (req, res) => {
  try {
    const { firstName, lastName, subject, details } = req.body;

    const newContact = new Contact({
      firstName,
      lastName,
      subject,
      details,
    });

    await newContact.save();

    // send email
    const data = await resend.emails.send({
      from: "info@tutorinc.co",
      to: ["abdulrafey0824@gmail.com"],
      subject: `New Contact Request from ${firstName} ${lastName}`,
      text: `      
      Name: ${firstName} ${lastName}
      Subject: ${subject}
      Details: ${details}`,
    });

    if (data) {
      return res.status(201).json({
        message: "Contact request sent successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Unable to make a contact",
    });
  }
};

// For fetching all contact messages
exports.fetchAll = async (req, res) => {
  try {
    const messages = await Contact.find();
    res.send({
      messages,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to fetch contacts",
    });
  }
};
