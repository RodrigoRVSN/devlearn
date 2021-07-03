import { EntityRepository, Repository } from "typeorm";
import Class from "../app/models/Class";

@EntityRepository(Class)
class ClassRepositories extends Repository<Class> {}

export { ClassRepositories };
