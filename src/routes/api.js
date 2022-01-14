const express = require("express");
const route = express.Router();
const CaseStudyController = require("../controllers/caseStudy");

// Route for case study api.
route.post(
  "/records",
  CaseStudyController.recordsValidators, // Applied input validator
  (req, res, next) => {
    const msg = validationResult(req);
    if (!msg.isEmpty()) {
      let msgString = [];

      for (const err of msg.array()) {
        msgString.push(err.msg);
      }

      let responsePayload = {
        code: 422, // Invalid input format code.
        msg: msgString.join(), // Convert array to single line message.
        records: [], // Return empty collection in case of wrong input parameters.
      };
      return res.status(422).json(responsePayload);
    }
    next(); // Call next middleware
  },
  CaseStudyController.getRecords // Controller for case study data.
);

module.exports = route;
