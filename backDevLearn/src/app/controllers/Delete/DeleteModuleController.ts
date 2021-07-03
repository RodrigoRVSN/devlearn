import { Request, Response } from "express";
import { DeleteModuleService } from "../../../services/Delete/DeleteModuleService";

class DeleteModuleController {
  async remove(req: Request, res: Response) {
    const deleteModuleService = new DeleteModuleService();

    const moduleRemoved = deleteModuleService.execute(req);

    return res.json(moduleRemoved);
  }
}
export { DeleteModuleController };
