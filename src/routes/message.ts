import { Router } from "express";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const message = require("../controllers/message");
const router = Router();

router.post("/sendmessage", message.sendMessage);

router.post("/webhooks", message.recieveWebhooks);

export default router;
