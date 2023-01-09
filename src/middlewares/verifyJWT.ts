import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function verifyJWT(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer")) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = (await jwt.verify(
      token,
      `${process.env.JWT_ACCESS_TOKEN_SECRET}`
    )) as JwtPayload;

    req.body.email = decoded.email;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Forbidden" });
  }
}
