# 📓 Simple Blog App

A full-stack blog application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). This project demonstrates CRUD functionality, API integration, and client-server communication.

---


## ✍️ About the Author
> Written by: [*JaberAlJ*](https://github.com/JaberAlJ)

---

## 🚀 Getting Started

Follow these steps to set up the development environment on your local machine.

### 1. Install Dependencies

Navigate to the respective directories and run the following commands:

```bash
# Client setup
cd blogapp/client
npm install

# Server setup
cd blogapp/server
npm install
```

### 2. Configure Environment Variables

🔧 **Client Environment**

Create a `.env` file inside the `client/src` directory with the following content:

```env
REACT_APP_SERVER_URL=http://localhost:3001
```

🛠️ **Server Environment**

Create a `.env` file inside the `server` directory with the following credentials:

```env
PORT=3001
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB_NAME=your_database_name
DB_CLUSTER=your_cluster_name
```
> ⚠️ Ensure that your MongoDB URI is correctly constructed in your server's configuration file using the above variables.

---

## 📂 Folder Structure Overview

```
blogapp/
├── client/      # React frontend
└── server/      # Express backend
```
