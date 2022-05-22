import type { NextApiResponse } from 'next'
import fs from 'fs';
import dotenv from "dotenv"
// Get environment variables from .env file
dotenv.config()

// Throw error if mongodb uri not set.
if(process.env.MONGODB_URI === undefined) throw 'Invalid MongoDB URI'
// Throw error if DB_NAME not set.
if(process.env.DB_NAME === undefined) throw 'Invalid DB_NAME'

// Set mongodb uri for use in project
const MONGODB_URI: string = process.env.MONGODB_URI
// Name of db used by api. Change name to use with other db instance.
const DB_NAME: string = process.env.DB_NAME 

// Convenience method to round results to 2 decimal places
const round = ({val, decimalPlaces}: {val: number, decimalPlaces: number}): number => {
    val = parseFloat(val + `e+${decimalPlaces}`)
    val = parseFloat(Math.round(val) + `e-${decimalPlaces}`)
    return val
  }

// Helper method to generate and send 400 response
const invalidParam = ({ res, paramName}: {res: NextApiResponse, paramName: string}, status: number = 400, overrideMessage: boolean = false, errorMessage: string = '') => {
  res.status(status);
  let message: string = overrideMessage ? errorMessage :`Query parameter '${paramName}' cannot be empty and must be a number`;
  return res.json({ message: message });
};

// Function to write any error to error log file.
const logError = ({ error }: {error: string} ) => {
    fs.writeFile('./api/logs/errors.txt', error, err => {
    if (err) {
      console.error(err);
    }
  });
}

// Helper method to log errro and send 500 response
const _500 = ({res, error} : {res: NextApiResponse, error: any}) => {
  // Log error to file
  logError({error:error})
  // return 500 response to client
  res.status(500)
  return res.json({ message: 'Internal Server Error. Contact Admin' })
}

export {round, invalidParam, logError, _500, MONGODB_URI, DB_NAME}