import { EntityRepository, Repository } from "typeorm";
import Module from "../app/models/Module";

@EntityRepository(Module)
class ModulesRepositories extends Repository<Module> {}

export { ModulesRepositories };
