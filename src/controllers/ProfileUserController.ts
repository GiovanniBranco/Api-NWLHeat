import { Request, Response } from "express";
import { ProfileUserService } from "../services/ProfileUserService";

class ProfileUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    try {
      const service = new ProfileUserService();
      const result = await service.execute(user_id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(404).json({
        ErrorMessage: `Não foi encontrado nenhum usuário com id: ${user_id}`,
      });
    }
  }
}

export { ProfileUserController };
