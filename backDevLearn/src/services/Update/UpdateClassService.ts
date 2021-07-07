import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ClassRepositories } from "../../repositories/ClassesRepositorioes";

class UpdateClassService {
  async execute(
    moduleId: string,
    dataClass: Date,
    nameClass: string,
    request: Request,
    response: Response
  ) {
    const classesRepositories = getCustomRepository(ClassRepositories);

    const requestedClass = await classesRepositories.findOne(request.params.id);

    if (requestedClass) {
      const classNew = await classesRepositories.update(requestedClass.id, {
        moduleId: moduleId || requestedClass.moduleId,
        nameClass: nameClass || requestedClass.nameClass,
        dataClass: dataClass || requestedClass.dataClass,
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
