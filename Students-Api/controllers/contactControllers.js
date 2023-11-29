const { memoryStorage } = require("multer");
const Contact = require("../models/Contact");

const { Resend } = require("resend");
const apiKey = `re_RjS3uXXC_8jALAEC5ycq5QX4PbLDSJnyp`;
const resend = new Resend(apiKey);

exports.create = async (req, res) => {
  try {
    const { firstName, lastName, email, subject, details } = req.body;

    const newContact = new Contact({
      firstName,
      lastName,
      email,
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
      Email: ${email}
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

// For Deleting Contact
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const msg = await Contact.findById({ _id: id });

    if (!memoryStorage) {
      return res.status(404).json({
        error: "Contact Msg With That ID Does Not Exist",
      });
    }

    await Contact.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "Contact Message Deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable To Delete Message",
    });
  }
};
