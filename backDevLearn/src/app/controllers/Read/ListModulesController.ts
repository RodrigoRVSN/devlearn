import { Request, Response } from "express";
import { ListModulesService } from "../../../services/Read/ListModulesService";

class ListModulesController {
  async list(request: Request, response: Response) {
    const listModulesService = new ListModulesService();

    const modules = await listModulesService.execute();

    return response.json(modules);
  }
}

export { ListModulesController };
