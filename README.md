# Bitespeed Backend Task - Identity Reconciliation

This project implements an identity reconciliation service that links customer contacts using email and phone numbers.

## Tech Stack

Node.js  
Express.js  
TypeScript  
Prisma ORM  
SQLite  

## API Endpoint

POST /identify

### Example Request

{
 "email": "doc@fluxkart.com",
 "phoneNumber": "123456"
}

### Example Response

{
 "contact": {
   "primaryContactId": 1,
   "emails": ["doc@fluxkart.com"],
   "phoneNumbers": ["123456"],
   "secondaryContactIds": []
 }
}

## Run Locally

Install dependencies

npm install

Start server

npm run dev

Server runs at

http://localhost:3000

## Health Check

GET /health

## Hosted API

(Add after deployment)
## Live API

POST https://bitespeed-identity-reconciliation-1-0x3e.onrender.com/identify
