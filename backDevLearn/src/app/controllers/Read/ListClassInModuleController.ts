import { Request, Response } from "express";
import { ListClassInModuleService } from "../../../services/Read/ListClassInModuleService";

class ListClassInModuleController {
  async list(request: Request, response: Response) {
    const moduleId = request.params.id;

    const listClassInModuleService = new ListClassInModuleService();

    const classInModule = await listClassInModuleService.execute(moduleId);

    return response.json(classInModule);
  }
}
export { ListClassInModuleController };
