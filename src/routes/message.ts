import { Router } from "express";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const message = require("../controllers/message");
const router = Router();

router.post("/sendstatictemplate", message.sendstaticTemplate);
router.post("/sendmessage", message.sendMessageToNumber);
router.post("/webhooks", message.recieveWebhooks);
router.get("/webhooks", message.verifyWebhook);
export default router;
