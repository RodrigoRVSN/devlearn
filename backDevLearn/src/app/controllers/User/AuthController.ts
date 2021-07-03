import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../../models/User";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class AuthController {
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const token = jwt.sign({ id: user.id }, "secret", {
      subject: user.id,
      expiresIn: "1d",
    });

    return res.json(token);
  }
}

export default new AuthController();
