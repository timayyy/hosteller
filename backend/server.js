const express = require("express");
const dotenv = require("dotenv")

const connectDB = require("./config/db")
const colors = require("colors")
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config()

connectDB();

// import leaveRequestRoutes from "./routes/leaveRequestRoutes.js";
const userRoutes = require("./routes/userRoutes");

const app = express()

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Api running....')
})

// app.use('/api/leaverequest', leaveRequestRoutes)
app.use('/api/users', userRoutes)


app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5555

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))