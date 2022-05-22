import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from "nextjs-cors";
import {
  connect, 
  getDoc, 
  getGross, 
  invalidParam,
  _500,
  DB_NAME, 
} from "../../lib";

// connect to db instance
connect()

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
  // Set cors configuration
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  // Destructure query params from request header into variables
  let net, totalAllowance, pensionTier;
  ({ net, totalAllowance, pensionTier } = req.query);

  // Validate required query params net, totalAllowance and PensionTier
  // Check if pensionTier is undefined
  if(pensionTier === undefined ) return invalidParam({res:res, paramName: 'pensionTier'})

  // Check if net is a number
  net = Number(net);
  if (isNaN(net))
    return invalidParam({
      res: res,
      paramName: "net",
    });

  // Check if totalAllowance is a number
  totalAllowance = Number(totalAllowance);
  if (isNaN(totalAllowance))
    return invalidParam({
      res: res,
      paramName: "totalAllowance",
    });

  // var to hold pension tiers
  var pensionTiers
  // var to hold taxBrackets
  var taxBrackets 
  try{
    //Get pension tiers from db 
    pensionTiers = await getDoc({collectionName: 'pensionTiers', dbName: DB_NAME})
    // Get tax brackets to doc from db
    taxBrackets = await getDoc({collectionName: 'taxBrackets', dbName: DB_NAME})
    if(taxBrackets !== null) taxBrackets = taxBrackets.txBrackets
  }
  catch (e){
    // Send a 500 response to client
    return _500({res: res, error: e})
  }

  // Find pension tier from pension tiers
  pensionTier = pensionTier.toString().toLowerCase()
  if (pensionTiers!== null && pensionTier in pensionTiers) pensionTier = pensionTiers[pensionTier]
  else return invalidParam({res:res, paramName:'pensionTier'}, 400, true, 'invalid pension tier.')

  // Calculate gross salary
  let suggestedCompensation = getGross(net, totalAllowance, taxBrackets, pensionTier);
  
  // return result
  res.json(suggestedCompensation);
};

export default handler;
