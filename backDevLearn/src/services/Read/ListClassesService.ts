import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { ClassRepositories } from "../../repositories/ClassesRepositorioes";

class ListClassesService {
  async execute() {
    const classRepositories = getCustomRepository(ClassRepositories);

    const classes = await classRepositories.find();

    return classToPlain(classes);
  }
}

export { ListClassesService };
