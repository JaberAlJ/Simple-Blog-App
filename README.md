# Simple-Blog-App
Simple Blog App using MERN stack.

---

## Getting Started:
1. Install dependencies in both client and server directories:
    - `\blogapp\client> npm i`
    - `\blogapp\server> npm i`

2. Create a `.env` file in the **client\src** directory with the following content:
```
REACT_APP_SERVER_URL=http://localhost:3001
```
3. Create a `.env` file in the **server** directory with the following content:
```
PORT = 3001
DB_USER = MongoDB_username
DB_PASSWORD = MongoDB_password
DB_NAME = MongoDB_database_name
DB_CLUSTER = MongoDB_cluster_name
```