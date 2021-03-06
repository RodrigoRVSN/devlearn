import { getCustomRepository } from "typeorm";
import { ClassRepositories } from "../../repositories/ClassesRepositorioes";

class ListClassInModuleService {
  async execute(id: string) {
    const classRepositories = getCustomRepository(ClassRepositories);

    const modules = await classRepositories.find({
      where: {
        moduleId: id,
      },
      relations: ["moduleClass"],
    });
    return modules;
  }
}

export { ListClassInModuleService };
