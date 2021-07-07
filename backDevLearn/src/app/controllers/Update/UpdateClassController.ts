import { Request, Response } from "express";
import { UpdateClassService } from "../../../services/Update/UpdateClassService";

class UpdateClassController {
  async store(request: Request, response: Response) {
    const { moduleId, dataClass, nameClass } = request.body;
    const updateClassController = new UpdateClassService();

    const classUpdated = await updateClassController.execute(
      moduleId,
      dataClass,
      nameClass,
      request,
      response
    );

    return response.json(classUpdated);
  }
}

export { UpdateClassController };
