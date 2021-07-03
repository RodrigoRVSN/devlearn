import { Request, Response } from "express";
import { CreateClassService } from "../../../services/Create/CreateClassService";

class CreateClassController {
  async store(request: Request, response: Response) {
    const { module_id, dataClass, name_class } = request.body;

    const createClassService = new CreateClassService();

    const classNew = await createClassService.execute({
      dataClass,
      module_id,
      name_class,
    });

    return response.json(classNew);
  }
}

export { CreateClassController };
