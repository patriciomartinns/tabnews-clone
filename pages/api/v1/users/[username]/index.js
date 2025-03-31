import { createRouter } from "next-connect";

import controller from "infra/controller";
import user from "models/user.js";

const router = createRouter();

async function getHandler(request, response) {
  const { username } = request.query;

  const result = await user.findOneByUsername(username);

  return response.status(200).json(result);
}

router.get(getHandler);

export default router.handler(controller.errorHandlers);
