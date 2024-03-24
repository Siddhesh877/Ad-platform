

# Ad Platform

* This application features an ad platform where a business can create an account and create,update,delete and see all of the ads created by business account user and viewre can create an account here to see a targeted ad. Ad is targeted towards viewer by gender,age group and location.

## Features

- Register/login both type of users
- Business can Create, read, update, and delete ads.
- Viewer can view targeted ads.


## Author

- [@Siddhesh877](https://github.com/Siddhesh877)


## Tech Stack

**Frontend:** Reactjs,Material UI

**Server:** Nodejs

**Database:** Mongodb

**Authentication:** JWT

## Run Locally

#### Steps:

Clone the project

```bash
  git clonehttps://github.com/Siddhesh877/Ad-platform
```

Go to the project directory

```bash
  cd Ad-platform
```

Install dependencies

```bash
  npm install
```

Database setup:

- No need to setup database it is on mongodb server and any ip which have connection string can connect(connection string is in .env of backend) 

Run app

- Run first server by
```bash
    cd ad-platform-backend
    npm start
```
- Run frontend by
```bash
    cd ..
    cd ad-platform
    npm run
```
Backend is now up and running on port 5501.
Frontend is now up and running on port 3000.


## API Reference

#### 1. Register new Business

```http
  POST /api/business/register
```
#### 2. Register new Viewer

```http
  POST /api/viewer/register
```

#### 3. User login

```http
  POST /api/viewer/login
```
#### 4. Business login

```http
  POST /api/business/login
```
#### 5. Get all targeted ads

```http
  GET /api/viewer/getTargetedAds
```
#### 6. Get all ads posted by business

```http
  GET /api/viewer/getAds
```
#### 7. Update Ad

```http
  GET /api/business/updateAd/:id
```
#### 8. Delete Ad

```http
  GET /api/business/deleteAd/:id
```

## Frontend Reference

- Login User (for both users)
```http
   http://localhost:3000/login
```
- Register User (for both users)
```http
   http://localhost:3000/register
```
- Viewer Page
```http
   http://localhost:3000/viewer
```
- Business Page
```http
   http://localhost:3000/business
```






