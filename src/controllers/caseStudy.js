require("dotenv").config();
const Query = require("./query");
const { MongoClient } = require("mongodb");
const { check } = require("express-validator");

// Setup mongodb client
const client = new MongoClient(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Case study records controller
exports.getRecords = async (req, res, next) => {
  const { startDate, endDate, minCount, maxCount } = req.body; // Parse parameters from response body.

  // Initialize response payload.
  let responsePayload = {
    code: 0,
    msg: "success",
    records: [],
  };

  // Construct mondodb pipeline expression from resquest parameter. 
  let query = Query.query(startDate, endDate, minCount, maxCount);

  try {
    // Connect to mongodb database.
    await client.connect();

    // Request mongodb database with constructed expression.
    results = await client
      .db(process.env.MONGO_DB_NAME)
      .collection("records")
      .aggregate(query)
      .toArray();

    // Set response data in response payload property.
    responsePayload.records = results;
  } catch (error) {
    // Write error to console.
    console.error(error);
    // Set internal server error response code in resposne payload.
    responsePayload.status = 500;
    // Original error response is hidden to prevent vulnerability exposer. 
    responsePayload.msg = "error";
  } finally {
    // Close the connection when in every case.
    await client.close();
  }

  // Send the response to the client.
  res.send(responsePayload);
};

// Input validators for date and numbers
exports.recordsValidators = [
  check("startDate", "startDate requires a date. e.g. 2016-01-26").isDate(),
  check("endDate", "endDate requires a date. e.g. 2018-02-0.2").isDate(),
  check("minCount", "minCount requires a number. e.g. 3000").isNumeric(),
  check("maxCount", "maxCount requires a number. e.g. 3000").isNumeric(),
];
