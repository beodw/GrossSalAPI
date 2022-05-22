import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import getGross from "../../lib/grossCalc";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with GET
    methods: ["GET"],
  })
);

// store and retrieve tax brackets using mongo db
const taxBrackets = [
  { val: 365, rate: 0 },
  { val: 110, rate: 0.05 },
  { val: 130, rate: 0.1 },
  { val: 3000, rate: 0.175 },
  { val: 16395, rate: 0.25 },
  { val: 20000, rate: 0.3 },
];
// Helper method to generate and send 400 response
const _400 = ({ res, invalidParameter }) => {
  res.status(400);
  invalidParameter = `Query parameter '${invalidParameter}' cannot be empty and must be a number`;
  return res.json({ invalidParameter });
};

const handler = async (req, res) => {
  // Run cors
  await cors(req, res);

  // Destructure query params from request header into variables
  let net, totalAllowance;
  ({ net, totalAllowance } = req.query);

  // Validate required query params net and totalAllowance
  net = parseInt(net);
  totalAllowance = parseInt(totalAllowance);

  if (isNaN(net))
    return _400({
      res: res,
      invalidParameter: "net",
    });
  if (isNaN(totalAllowance))
    return _400({
      res: res,
      invalidParameter: "totalAllowance",
    });

  // Calculate gross salary
  let suggestedCompensation = getGross(net, totalAllowance, taxBrackets);

  // return result
  res.json(suggestedCompensation);
};

export default handler;
