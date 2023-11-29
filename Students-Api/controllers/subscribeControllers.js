const Subscriber = require("../models/Subscriber");

// Add Subscriber
exports.create = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the subscriber already exists
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(409).json({
        error: "Subscriber Already Exists",
      });
    }
    const newSubscriber = new Subscriber({
      email,
    });

    await newSubscriber.save();
    res.status(201).json({
      message: "Subscribed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to Subscribe",
    });
  }
};
