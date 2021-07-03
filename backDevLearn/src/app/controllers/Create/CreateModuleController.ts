import { Request, response, Response } from "express";
import { CreateModuleService } from "../../../services/Create/CreateModuleService";

class CreateModuleController {
  async store(req: Request, res: Response) {
    const { module } = req.body;
    const createModuleService = new CreateModuleService();
    const moduleName = await createModuleService.execute(module);
    return res.json(moduleName);
  }
}

export { CreateModuleController };
