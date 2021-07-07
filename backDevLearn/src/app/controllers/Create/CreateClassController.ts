import { Request, Response } from "express";
import { CreateClassService } from "../../../services/Create/CreateClassService";

class CreateClassController {
  async store(request: Request, response: Response) {
    const { moduleId, dataClass, nameClass } = request.body;

    const createClassService = new CreateClassService();

    const classNew = await createClassService.execute({
      dataClass,
      moduleId,
      nameClass,
    });

    return response.json(classNew);
  }
}

export { CreateClassController };
