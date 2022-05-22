import {MongoClient} from "mongodb"
import {Doc} from "./types"
import {logError, _500} from "./utils"
import {MONGODB_URI} from "./utils"


// Create a new MongoClient
const client: MongoClient = new MongoClient(MONGODB_URI);

// Function to connect to local instance of mongo db and return specified collection
//  In production a remote instance can be used by supplying the remote uri with the necessary username and password
const connect =  async () => {
  try {
    // Connect the client to the server
    await client.connect()
  }
  catch (error) {
    // Log to error log file and return 500 to client
    return logError({error: String(error)})
  } 
}

// Function to close connection to db
const closeConnection = ({ client } : { client: MongoClient }) => {
    client.close();
}

// Function to data from specified collection
const getDoc = async ({collectionName, dbName}: {collectionName : string, dbName: string}): Promise<Doc> => {
    let doc = client.db(dbName).collection(collectionName).findOne()
    if (doc === null) {
      let error: string = `Document not found in ${collectionName}. DB: ${dbName}`
      logError({error: error})
      throw error 
    }
    else {return doc}
}

export { getDoc, connect, closeConnection}