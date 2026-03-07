import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import identifyRoutes from "./routes/identifyRoutes"


dotenv.config()


const app = express()


app.use(cors())
app.use(express.json())

app.use("/", identifyRoutes)
const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Bitespeed Identity Reconciliation API Running")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})