import { Request, Response } from "express";
import { Get3LastMessagesService } from "../services/Get3LastMessagesService";

class Get3LastMessagesController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    try {
      const service = new Get3LastMessagesService();
      const result = await service.execute(user_id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        ErrorMessage:
          "Houve algum erro na requisição, verifique se foi informado o usuário e tente novamente",
      });
    }
  }
}

export { Get3LastMessagesController };
