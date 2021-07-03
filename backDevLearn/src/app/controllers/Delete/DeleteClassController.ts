import { Request, Response } from "express";
import { DeleteClassService } from "../../../services/Delete/DeleteClassService";

class DeleteClassController {
  async remove(req: Request, res: Response) {
    const deleteClassService = new DeleteClassService();

    const classRemoved = deleteClassService.execute(req);

    return res.json(classRemoved);
  }
}
export { DeleteClassController };
