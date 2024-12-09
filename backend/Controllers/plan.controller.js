

const { response } = require("express");
const Plan = require("../Models/plan.model");
const sgMail = require("@sendgrid/mail");

const API_KEY = process.env.EMAIL_SEND_KEY;

const viewPlan = (req, res) => {
  const getPlan = async () => {
    const data = await Plan.find();
    res.json(data);
  };

  getPlan().catch((err) => {
    console.log(err);
  });
};

const viewPlanById = (req, res) => {
  const planId = req.params.id;

  const getPlan = async () => {
    const data = await Plan.findById(planId);
    if (data == {}) {
      res.status(404).json({
        message: "Plan not found",
      });
    } else {
      res.json(data);
    }
  };

  getPlan().catch((err) => {
    console.log(err);
  });
};

const createPlan = (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const destination = req.body.destination;
  const estimatedExpenses = req.body.estimatedExpenses;
  const travelDescription = req.body.travelDescription;
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  const savePlan = async () => {
    const plan = new Plan({
      firstName,
      lastName,
      email,
      startDate,
      endDate,
      destination,
      estimatedExpenses,
      travelDescription,
      userId: user._id
    });

    const result = await plan.save();
    res.json({ result, status: "ok" });
  };
  savePlan();
};

const deletePlan = (req, res) => {
  const planId = req.params.id;
  const deletePlan = async () => {
    const data = await Plan.findByIdAndRemove({ _id: planId });
    if (data !== undefined) {
      res.json(data);
    } else {
      res.send("No post found with given ID");
    }
  };
  deletePlan().catch((err) => {
    console.log(err);
  });
};

const sendEmail = (req, res) => {
  const toEmail = req.body.to;

  try {
    sgMail.setApiKey(API_KEY);

    const message = {
      to: toEmail,
      from: "vanechamanav@gmail.com",
      subject: "Request to join the travel plan",
      text: "Hello there. I really liked your plan that you have posted. I would like to join you and have fun. Witing for your response",
      html: "<h3>Hello there. I really liked your plan that you have posted. I would like to join you and have fun. Waiting for your response</h3>",
    };

    sgMail
      .send(message)
      .then(
        res.status(200).json({
          message: "Email sent Successfully",
          success: true,
        })
      )
      .catch((error) => {
        res.status(400).json({
          message: error,
        });
      });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const updatePlan = (req, res) => {
  const _id = req.params.id;
  const {
    startDate,
    endDate,
    destination,
    estimatedExpenses,
    travelDescription,
  } = req.body;
  const updatePlan = async () => {
    let doc = await Plan.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          startDate: startDate,
          endDate: endDate,
          destination: destination,
          estimatedExpenses: estimatedExpenses,
          travelDescription: travelDescription,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({ doc, status: "ok" });
  };
  updatePlan().catch((err) => {
    console.log(err);
  });
};

module.exports = {
  viewPlan,
  createPlan,
  viewPlanById,
  deletePlan,
  updatePlan,
  sendEmail,
};
