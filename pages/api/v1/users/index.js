import { createRouter } from "next-connect";

import controller from "infra/controller";
import user from "models/user.js";

const router = createRouter();

async function postHandler(request, response) {
  const userInputValues = request.body;
  const newUser = await user.create(userInputValues);
  return response.status(201).json(newUser);
}

router.post(postHandler);

export default router.handler(controller.errorHandlers);
