import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ClassRepositories } from "../../repositories/ClassesRepositorioes";

class UpdateClassService {
  async execute(
    module_id: string,
    dataClass: Date,
    name_class: string,
    request: Request,
    response: Response
  ) {
    const classesRepositories = getCustomRepository(ClassRepositories);

    const requestedClass = await classesRepositories.findOne(request.params.id);

    if (requestedClass) {
      const classNew = await classesRepositories.update(requestedClass.id, {
        name_class: name_class || requestedClass.name_class,
        dataClass: dataClass || requestedClass.dataClass,
        module_id: module_id || requestedClass.module_id,
      });

      if (classNew.affected === 1) {
        const classUpdated = await classesRepositories.findOne(
          requestedClass.id
        );
        return classUpdated;
      }

      return response.status(404).json({ message: "not found" });
    }
  }
}

export { UpdateClassService };
