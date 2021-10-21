import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController {
  async handle(request: Request, response: Response) {
    const { message } = request.body;
    const { user_id } = request;

    try {
      const service = new CreateMessageService();
      const result = await service.execute(message, user_id);

      return response.status(201).json(result);
    } catch (error) {
      return response.status(400).json({
        ErrorMessage:
          "Houve algum erro na requisição, verifique se o campo message está preenchido e tente novamente",
      });
    }
  }
}

export { CreateMessageController };
