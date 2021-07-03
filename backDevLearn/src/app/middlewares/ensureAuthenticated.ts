import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Recebe o token

  const authToken = request.headers.authorization;

  // Valida se token está preenchido

  if (!authToken) { 
    return response.status(401).end();
  }

  // Verifica se token é válido

  const [, token] = authToken.split(" ");
  try {
    const { sub } = verify(
      token,
      "03498a951af26cdfd2ea8b6872e64743"
    ) as IPayload;

    request.user_id = sub;
    return next();
  } catch (err) {
    return response.status(401).end();
  }

  // Recupera informações do usuário
}
