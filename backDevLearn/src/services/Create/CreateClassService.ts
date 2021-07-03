import { getCustomRepository } from "typeorm";
import { ClassRepositories } from "../../repositories/ClassesRepositorioes";
import { ModulesRepositories } from "../../repositories/ModulesRepositories";

interface IClassCreate {
  dataClass: Date;
  name_class: string;
  module_id: string;
}

class CreateClassService {
  async execute({ dataClass, module_id, name_class }: IClassCreate) {
    const classRepositories = getCustomRepository(ClassRepositories);
    const modulesRepositores = getCustomRepository(ModulesRepositories);

    /* Faltando modulo ou data */

    if (!module_id || !dataClass) {
      throw new Error("Data/Module_id missing!");
    }

    /* Modulo existe mesmo? */

    const moduleExists = await modulesRepositores.findOne(module_id);

    if (!moduleExists) {
      throw new Error("Module don't exists!");
    }

    /* Aula existe?  */

    const classAlreadyExists = await classRepositories.findOne({ name_class });

    if (classAlreadyExists) {
      throw new Error("Class exists");
    }

    /* OK */

    const classNew = classRepositories.create({
      dataClass,
      module_id,
      name_class,
    });

    await classRepositories.save(classNew);
    return classNew;
  }
}

export { CreateClassService };
