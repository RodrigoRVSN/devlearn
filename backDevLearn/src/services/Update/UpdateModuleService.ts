import { Request, Response } from "express";
import { getConnection, getCustomRepository, getRepository } from "typeorm";
import Module from "../../app/models/Module";
import { ModulesRepositories } from "../../repositories/ModulesRepositories";

class UpdateModuleService {
  async execute(id: string, request: Request, response: Response) {
    const modulesRepositories = getCustomRepository(ModulesRepositories);

    const requestedModule = await modulesRepositories.findOne(
      request.params.id
    );

    if (requestedModule) {
      const moduleNew = await modulesRepositories.update(requestedModule.id, {
        module: id,
      });

      if (moduleNew.affected === 1) {
        const moduleUpdated = await modulesRepositories.findOne(
          requestedModule.id
        );
        return response.json(moduleUpdated);
      }

      return response.status(404).json({message: 'not found'});
    }
  }
}

export { UpdateModuleService };
