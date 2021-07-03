import { Request, Response } from "express";
import { UpdateModuleService } from "../../../services/Update/UpdateModuleService";

class UpdateModuleController {
  async store(request: Request, response: Response) {
    const { module } = request.body;
    const updateModuleController = new UpdateModuleService();

    const moduleUpdated = await updateModuleController.execute(
      module,
      request,
      response
    );

    return response.json(moduleUpdated);
  }
}

export { UpdateModuleController };
