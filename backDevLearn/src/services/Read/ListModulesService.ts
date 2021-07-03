import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { ModulesRepositories } from "../../repositories/ModulesRepositories";

class ListModulesService {
  async execute() {
    const modulesRepositories = getCustomRepository(ModulesRepositories);

    const modules = await modulesRepositories.find();

    return classToPlain(modules);
  }
}

export { ListModulesService };
