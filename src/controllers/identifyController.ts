import { Request, Response } from "express"
import identifyService from "../services/identifyService"

const identifyController = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber } = req.body

    const result = await identifyService(email, phoneNumber)

    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export default identifyController