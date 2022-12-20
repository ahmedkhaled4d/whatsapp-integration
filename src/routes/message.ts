import { Router } from "express";
import {
  sendMessageToNumber,
  sendstaticTemplate
} from "../controllers/message";
// eslint-disable-next-line @typescript-eslint/no-var-requires

const webhooks = require("../controllers/webhooks");
const router = Router();

router.post("/send/template", sendstaticTemplate);
router.post("/send/message", sendMessageToNumber);

router.post("/webhooks", webhooks.recieveWebhooks);
router.get("/webhooks", webhooks.verifyWebhook);
export default router;
