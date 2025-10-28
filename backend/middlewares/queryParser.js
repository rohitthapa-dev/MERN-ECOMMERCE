
// Handles operators like gte, lte, lt, gt, ne.
export const queryParser = (req, res, next) => {
  const queryObj = {};

  // loop over each key in req.query.
  for (let key in req.query) {
    // check if it is object or not
    if (typeof req.query[key] === "object") {
      // gets the operator, e.g., 'gte'.
      const operator = Object.keys(req.query[key])[0];
      // gets the value for that operator, e.g., '4'.
      const value = req.query[key][operator];
      // converts it to MongoDB syntax by prepending $, e.g., '$gte'.
      const mongoOperator = `$${operator}`;

      queryObj[key] = { [mongoOperator]: isNaN(value) ? value : Number(value) }
    } else {
      queryObj[key] = req.query[key];
    }
  }

  req.mongoQuery = queryObj;
  next();
}