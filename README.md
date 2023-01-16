
# Technical test - Documentation

The following are the steps to be followed to execute the project locally

#### Nest js & MySQL
##### Make sure you have Node.js and MySql installed.

    
## Database connection - MySQL 8.0.31

```bash
  HOST  : localhost
  PORT  : 3306
  USERNAME  : root
  PASSWORD  : 123456
  DATABASE : test
```

## Installation

Install rider-driver-api

```bash
  $ git clone https://github.com/carlospalominopro/rider-driver-api.git

  $ cd rider-driver-api
  
  rename file .env.local to .env in root folder
  run SLQ script (init-database.sql) located in /db folder
  
  $ npm install
  $ npm run start:dev
```

## API Reference

### Note : The use of POSTMAN is recommended, in root folder 
-------------------------------------------------
#### 01 - Get token

```http
  POST /api/get-token
```

| Parameter |   
| :-------- | 
| No parameters required |

#### 02 - Request driver

```http
  POST /api/request/create
```

| Parameter | Type     | Description   | Example                    |
| :-------- | :------- | :-------------------------------- | :--------------------------------
| `rider_id`      | `int` | **Required**. Rider ID from DB Table - rider | 1 |
| `latitude`      | `float` | **Required**. Rider's Latitude | 4.608839965578942 |
| `latitude`      | `float` | **Required**. Rider's Longitude | -74.07642114458059 |

#### 03 - Transaction Create (end trip)

```http
  POST /api/transaction/create
```

| Parameter | Type     | Description   | Example                    |
| :-------- | :------- | :-------------------------------- | :--------------------------------
| `idRequest`      | `int` | **Required**. Request ID from DB Table - request | 1 |
| `latitude_end`      | `float` | **Required**. End Latitude | 4.639332056323714 |
| `longitude_end`      | `float` | **Required**. End Longitude | -74.12114860195318 |

## Test

```bash

  $ npm run test

```

Author : Carlos Palomino - 2023