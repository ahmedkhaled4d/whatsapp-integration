import { Router } from "express";
import {
  sendMessageToNumber,
  sendstaticTemplate,
  sendTemplateOneVar,
  sendTemplateOneVarImage
} from "../controllers/message";
import { recieveWebhooks, verifyWebhook } from "../controllers/webhooks";
// eslint-disable-next-line @typescript-eslint/no-var-requires

const router = Router();

router.post("/send/template", sendstaticTemplate);
router.post("/send/templateonevar", sendTemplateOneVar);
router.post("/send/templateonevarimg", sendTemplateOneVarImage);
router.post("/send/message", sendMessageToNumber);

router.post("/webhooks", recieveWebhooks);
router.get("/webhooks", verifyWebhook);
export default router;
