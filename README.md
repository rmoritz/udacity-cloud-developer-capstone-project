# Udacity Cloud Developer Capstone Project

This is my submission for the capstone project assignment of the Udacity Cloud Developer Nanodegree. It is an enhanced version of the TODO list application developed in course 4.

## Enhancements to C4 project

- Request validation (via API gateway)
- Unit tests of backend business logic and client React components
- (Semi-)Automated backend integration tests (via Newman CLI)
- CI (build & test) of the client (via GitHub Actions)
- CI/CD of the Serverless backend (via SEED) 

Each of these enhacncements are described below.

### Request validation

Requests to the backend web services are validated by API gateway. Validation specs were added to the serverless.yml and implemented by [serverless-reqvalidator-plugin](https://github.com/RafPe/serverless-reqvalidator-plugin). The following is provided:

1. Validation of query string parameters
2. Validation of request body shape

In the first case, API Gateway validates the presence of required query string parameters. Unfortunately, validationo of path components is not provided, and so the UPDATE and DELETE requests had to be modified to use query string paremeters, and thus are no longer RESTful.

In the second case, API Gateway validates the presence of required fields in the request body (JSON format). The values of the fields are not validated.

### Unit tests

Unit tests were added to the backend and client, and can be run as follows:

#### Backend

```
cd backend
npm i
npm t
```

### Client

```
cd client
npm i
npm t
```

### Backend integration tests

It is possible to run integration tests for the backend web services in a semi-automated fashion. The only manual step required may be to ensure the `baseUri` and `authToken` collection variables in the [Postman collection](https://github.com/rmoritz/udacity-cloud-developer-capstone-project/blob/master/backend/capstone.postman_collection.json) are correct.

To run the integration tests:

```
npm i -g newman
newman backend/capstone.postman_collection.json
```

### CI of the client

The client code is build and unit tests are run on any commit to the `dev` and `master` branches of this repository. This was setup using [GitHub Actions](https://github.com/features/actions). See the [Actions tab](https://github.com/rmoritz/udacity-cloud-developer-capstone-project/actions) for details.

### CI/CD of the backend

On every commit to the `dev` branch, the backend Serverless application code is built, unit tests are run, and it is deployed to the `dev` stage on AWS via [SEED](https://seed.run/).  The backend CI/CD pipeline on SEED is connected to the GitHub repo and a backend build/deploy is conditional on the client build/test being succesful. Successful `dev` deployments can be promoted ot prod via the SEED console.

## Running frontend or backend locally

Note it is only possible to run one or the other, since both currently use TCP port 3000.

### Running the frontend locally

This will connect to my AWS `prod` serverless stack.

```
cd client
npm i
npm start
```

### Running the backend locally

```
cd backend
npm i
sls dynamodb install
sls offline start
```

Now you can query the local serverless offline instance using Postman and the included [Postman collection](https://github.com/rmoritz/udacity-cloud-developer-capstone-project/blob/master/backend/capstone.postman_collection.json). You need to set the `baseUri` variable to `http://localhost:3000/offline`.