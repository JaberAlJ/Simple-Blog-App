import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserModel from "./Models/UserModel.js";
import BlogModel from "./Models/BlogModel.js";
import * as ENV from "./config.js";

const app = express();
app.use(express.json());
app.use(cors());
app.listen(ENV.PORT, () => {
    console.log("Server is running...");
});

const connectionString =
    `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(connectionString)
    .then(() => { console.log("Server is connected...") })
    .catch((err) => { console.error("Server failed to connect: ", err) });

// ===================================== User API =====================================
app.post("/register-user", async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            name: name,
            email: email,
            password: hashedPassword,
        });
        await user.save();
        res.status(200).send({ user: user, msg: "The user registered successfully" });
    } catch (err) {
        res.status(500).send({ error: err, msg: "An error occurred" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(500).send({ msg: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ msg: "Authentication failed" });
        }
        res.status(200).send({ user: user, msg: "Success authentication" });
    } catch (err) {
        res.status(500).send({ error: err, msg: "An error occurred" });
    }
});

app.post("/logout", async (req, res) => {
    res.status(200).send({ msg: "Logout successfully" });
});

app.post("/update-profile/:id", async (req, res) => {
    try {
        const userID = req.params.id;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const user = await UserModel.findOne({ _id: userID });
        if (!user) {
            return res.status(500).send({ msg: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        await user.save();
        res.status(200).send({ user: user, msg: "User profile updated successfully" });
    } catch (err) {
        res.status(500).send({ error: err, msg: "An error occurred" });
    }
});

// ===================================== Blog API =====================================
app.post("/share-blog", async (req, res) => {
    try {
        const blogContent = req.body.blogContent;
        const bloggedBy = req.body.bloggedBy;

        const blog = new BlogModel({
            blogContent: blogContent,
            bloggedBy: bloggedBy,
        });
        await blog.save();
        res.status(200).send({ blog: blog, msg: "The blog posted successfully" });
    } catch (err) {
        res.status(500).send({ error: err, msg: "An error occurred" });
    }
});

app.get("/get-blogs", async (req, res) => {
    try {
        const blogs = await BlogModel.find({}).sort({ createdAt: -1 });
        const blogsCount = await BlogModel.countDocuments({});
        res.status(200).send({ blogs: blogs, blogsCount: blogsCount, msg: "All posted blogs are listed with blogs count" });
    } catch (err) {
        res.status(500).send({ error: err, msg: "An error occurred" });
    }
});

app.post("/like-blog/:id", async (req, res) => {
    try {
        const blogID = req.params.id;
        const userID = req.body.userID;

        const blog = await BlogModel.findOne({ _id: blogID });
        if (!blog) {
            console.log("Blog not found");
            return res.status(500).send({ msg: "Blog not found" });
        }
        const userIndex = blog.likes.users.indexOf(userID);
        if (userIndex === -1) {
            const blogToUpdate = await BlogModel.findOneAndUpdate(
                { _id: blogID },
                {
                    $inc: { "likes.count": 1 },
                    $addToSet: { "likes.users": userID }
                },
                { new: true }
            );
            res.status(200).send({ blog: blogToUpdate, msg: "Like blog" });
        }
        else {
            const blogToUpdate = await BlogModel.findOneAndUpdate(
                { _id: blogID },
                {
                    $inc: { "likes.count": -1 },
                    $pull: { "likes.users": userID }
                },
                { new: true }
            );
            res.status(200).send({ blog: blogToUpdate, msg: "dislike blog" });
        }
    } catch (err) {
        res.status(500).send({ error: err, msg: "An error occurred" });
    }
});