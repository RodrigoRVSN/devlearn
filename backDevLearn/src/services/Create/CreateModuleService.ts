import { getCustomRepository } from "typeorm";
import { ModulesRepositories } from "../../repositories/ModulesRepositories";

class CreateModuleService {
  async execute(module: string) {
    const modulesRepositories = getCustomRepository(ModulesRepositories);

    if (!module) {
      throw new Error("Informar texto");
    }

    const moduleAlreadyExists = await modulesRepositories.findOne({ module });

    if (moduleAlreadyExists) {
      throw new Error("Module exists");
    }

    const moduleNew = modulesRepositories.create({ module });
    await modulesRepositories.save(moduleNew);
    return moduleNew;
  }
}

export { CreateModuleService };
