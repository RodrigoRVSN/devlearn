import { Request, Response } from "express";
import { UpdateClassService } from "../../../services/Update/UpdateClassService";

class UpdateClassController {
  async store(request: Request, response: Response) {
    const { module_id, dataClass, name_class } = request.body;
    const updateClassController = new UpdateClassService();

    const classUpdated = await updateClassController.execute(
      module_id,
      dataClass,
      name_class,
      request,
      response
    );

    return response.json(classUpdated);
  }
}

export { UpdateClassController };
