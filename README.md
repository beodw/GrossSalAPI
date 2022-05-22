### Gross Salary API

## This is an API built using NextJS and mongodb.

#### To deploy and test this project follow the instructions below.

### Pre-requisites:

- A local or hosted instance of mongodb. To install and run mongodb locally follow the instructions at https://www.mongodb.com/docs/manual/installation/

- NodeJS version >= v16.13.1

## Install Instructions:

- #### 1. Clone this repo to local machine.
- #### 2. Change .env.example file name to .env and insert your values for MONGODB_URI and DB_NAME:

  - MONGODB_URI="Specify the uri for your instance of mongodb. If using a local instance with no username/password use mongodb://127.0.0.1:27017"
  - DB_NAME="Specify the name of the db to be used by the api. By default it is already set to 'grossAPI' in the .env.example file"

- #### 3. Configure db:

        The mongo client must have a db with the value of DB_NAME defined in .env. This should contain two mandatory collections, taxBrackets and pensionTiers.You can copy, paste and run each of the following commands to create them:
            1. use grossApi
            2. db.createCollection('pensionTiers')
            3. db.createCollection('taxBrackets')

        Each of these collections should contain one document. The document in the pensionTiers collection should have the following structure:
            {
                'tier 1': { employeeContrib: 0, employerContrib: 0.13 },
                'tier 2': { employeeContrib: 0.055, employerContrib: 0 },
                'tier 3': { employeeContrib: 0.05, employerContrib: 0.05 }
            }
        Note: You can copy the following command into the monogsh json straight into the mongosh terminal if the values are still accurate at the time of reading this.
            4. db.pensionTiers.insertOne({
                'tier 1': { employeeContrib: 0, employerContrib: 0.13 },
                'tier 2': { employeeContrib: 0.055, employerContrib: 0 },
                'tier 3': { employeeContrib: 0.05, employerContrib: 0.05 }
            })

        The document in the tax brackets collection should have the following structure:
            {
                txBrackets: [
                { val: 365, rate: 0 },
                { val: 110, rate: 0.05 },
                { val: 130, rate: 0.1 },
                { val: 3000, rate: 0.175 },
                { val: 16395, rate: 0.25 },
                { val: 20000, rate: 0.3 }
                ]
            }
        Note: You can copy the following command into the monogsh json straight into the mongosh terminal if the values are still accurate at the time of reading this

            5. db.taxBrackets.insertOne({
                    txBrackets: [
                    { val: 365, rate: 0 },
                    { val: 110, rate: 0.05 },
                    { val: 130, rate: 0.1 },
                    { val: 3000, rate: 0.175 },
                    { val: 16395, rate: 0.25 },
                    { val: 20000, rate: 0.3 }
                    ]
                })

- #### 3. Open a terminal window and cd into the base directory.
- #### 4. Run npm install
- #### 5. Run npm run build
- #### 6. Run npm run start

## Testing with postman:

#### Using the postman desktop application make a GET request to the 0.0.0.0:3000/api/calculateGross/

#### All values sent to the api are passed in the request as parameters and the following parameters are required:

#### 1. totalAllowance: The sum of all allowances given must be a number.

#### 2. net: The desired net amount must be a number.

#### 3. pensionTier: The pension tier. Must be a string. Following the instruction in the previous section will set the following accepted values: 'tier 1', 'tier 2', or 'tier 3'

# Integration Testing

## **Pre-requisites**

#### In order to run tests locally an instance of mongodb must be installed and running at localhost:27017 with no username and password. This is necessary for retrieving the data used for testing. Follow the instructions under configure db to set this up if you haven't already done so.

### **Run tests by doing the following:**

- ##### 1. cd to base directory of project

- ##### 2. Run npm run cypress

- #### 3. In the window that opens select tests.js under integration tests. This will open a chrome window from which all tests will be executed.
