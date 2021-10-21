import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { Get3LastMessagesController } from "./controllers/Get3LastMessagesController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);
router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
);
router.get(
  "/getMessages",
  ensureAuthenticated,
  new Get3LastMessagesController().handle
);

export { router };
