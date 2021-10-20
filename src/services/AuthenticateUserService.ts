import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

interface IAccessToken {
  access_token: string;
}

interface IUserResponse {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    //Obtenho o accessToken;
    const { data: accessTokenResponse } = await axios.post<IAccessToken>(
      url,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    //Obtenho as infos do usuário;
    const responseUser = await axios.get<IUserResponse>(
      "http://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      }
    );

    const { id, name, avatar_url, login } = responseUser.data;

    //Crio o usuário de acordo com o model;
    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    //Verifica se o usuário existe no banco, se não existir, é criado;
    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          avatar_url,
          name,
          login,
        },
      });
    }

    //Criando token
    const token = sign(
      {
        user: {
          id: user.id,
          login: user.login,
          name: user.name,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "3h",
      }
    );

    return { token, user };
  }
}

export { AuthenticateUserService };
