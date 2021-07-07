import { getCustomRepository } from "typeorm";
import { ClassRepositories } from "../../repositories/ClassesRepositorioes";
import { ModulesRepositories } from "../../repositories/ModulesRepositories";

interface IClassCreate {
  dataClass: Date;
  nameClass: string;
  moduleId: string;
}

class CreateClassService {
  async execute({ dataClass, moduleId, nameClass }: IClassCreate) {
    const classRepositories = getCustomRepository(ClassRepositories);
    const modulesRepositores = getCustomRepository(ModulesRepositories);

    /* Faltando modulo ou data */

    if (!moduleId || !dataClass) {
      throw new Error("Data/Module_id missing!");
    }

    /* Modulo existe mesmo? */

    const moduleExists = await modulesRepositores.findOne(moduleId);

    if (!moduleExists) {
      throw new Error("Module don't exists!");
    }

    /* Aula existe?  */

    const classAlreadyExists = await classRepositories.findOne({ nameClass });

    if (classAlreadyExists) {
      throw new Error("Class exists");
    }

    /* OK */

    const classNew = classRepositories.create({
      dataClass,
      moduleId,
      nameClass,
    });

    await classRepositories.save(classNew);
    return classNew;
  }
}

export { CreateClassService };
