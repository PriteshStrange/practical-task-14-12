const express = require("express");
const cors = require("cors");
require('dotenv').config();
const router = require("./routes");
const errorMiddleware = require("./middleware/Error");
const connectDatabase = require("./config/connect");
const cron = require('node-cron');
const { scheduleReminder } = require("./services/todo.service");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

connectDatabase();

cron.schedule('* * * * *', scheduleReminder);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Working finely" });
});

app.use("/api/v1", router);

app.use((req, res, next) => {
    return res.status(404).json({ status: 404, success: false, message: "Page not found on the server" });
});

app.use(errorMiddleware);

app.listen(port, () => {
    try {
        console.log(`Server is listing on the ${port}`)
    } catch (error) {
        console.log("Something is wrong");
    }
})