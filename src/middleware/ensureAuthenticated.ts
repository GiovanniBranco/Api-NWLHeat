import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  nextFunction: NextFunction
) {
  const authToken = request.headers.authorization;

  //Verifica se tem o token sendo enviado
  if (!authToken) {
    return response.status(401).json({
      errorCode: "token inválido",
    });
  }

  //Exemplo de token : Bearer eyioafnuiydasuidj9021u893iuj
  //Retiro o prefixo Bearer e coleto apenas o valor do token;
  const [, token] = authToken.split(" ");

  //Verifico se o token é válido;
  try {
    //Coleto o assunto, usuário que está enviando o token e transformo o sub em string;
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;
    request.user_id = sub;

    return nextFunction();
  } catch (error) {
    return response.status(401).json({ ErrorMessage: "Token expirado " });
  }
}
