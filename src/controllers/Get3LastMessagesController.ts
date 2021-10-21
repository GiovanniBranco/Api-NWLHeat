import { Request, Response } from "express";
import { Get3LastMessagesService } from "../services/Get3LastMessagesService";

class Get3LastMessagesController {
  async handle(request: Request, response: Response) {
    try {
      const service = new Get3LastMessagesService();
      const result = await service.execute();

      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        ErrorMessage: "Desculpe, não foi possível realizar esta consulta",
      });
    }
  }
}

export { Get3LastMessagesController };
