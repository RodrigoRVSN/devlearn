import { classToPlain } from "class-transformer";
import { Request } from "express";
import { getCustomRepository } from "typeorm";
import { ModulesRepositories } from "../../repositories/ModulesRepositories";

class DeleteModuleService {
  async execute(req: Request) {
    const modulesRepositories = getCustomRepository(ModulesRepositories);

    const moduleRemoved = await modulesRepositories.delete(req.params.id);

    return classToPlain(moduleRemoved);
  }
}

export { DeleteModuleService };
