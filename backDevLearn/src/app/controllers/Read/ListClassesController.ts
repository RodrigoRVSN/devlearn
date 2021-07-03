import { Request, Response } from "express";
import { ListClassesService } from "../../../services/Read/ListClassesService";

class ListClassesController {
  async list(request: Request, response: Response) {
    const listClassesService = new ListClassesService();

    const classes = await listClassesService.execute();

    return response.json(classes);
  }
}

export { ListClassesController };
