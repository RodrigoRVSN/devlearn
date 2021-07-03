import { classToPlain } from "class-transformer";
import { Request } from "express";
import { getCustomRepository } from "typeorm";
import { ClassRepositories } from "../../repositories/ClassesRepositorioes";

class DeleteClassService {
  async execute(req: Request) {
    const classRepositories = getCustomRepository(ClassRepositories);

    const classRemoved = await classRepositories.delete(req.params.id);

    return classToPlain(classRemoved);
  }
}

export { DeleteClassService };
