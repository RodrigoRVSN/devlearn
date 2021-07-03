import { Router } from "express";

import AuthController from "./app/controllers/User/AuthController";
import { CreateClassController } from "./app/controllers/Create/CreateClassController";
import { CreateModuleController } from "./app/controllers/Create/CreateModuleController";
import { ListClassesController } from "./app/controllers/Read/ListClassesController";
import { ListClassInModuleController } from "./app/controllers/Read/ListClassInModuleController";
import { ListModulesController } from "./app/controllers/Read/ListModulesController";
import UserController from "./app/controllers/User/UserController";
import authMiddleware from "./app/middlewares/authMiddleware";
import { DeleteModuleController } from "./app/controllers/Delete/DeleteModuleController";
import { DeleteClassController } from "./app/controllers/Delete/DeleteClassController";
import { UpdateModuleController } from "./app/controllers/Update/UpdateModuleController";
import { UpdateClassController } from "./app/controllers/Update/UpdateClassController";

const router = Router();

const createModuleController = new CreateModuleController();
const createClassController = new CreateClassController();
const listClassesController = new ListClassesController();
const listModulesController = new ListModulesController();
const listClassInModuleController = new ListClassInModuleController();
const deleteModuleController = new DeleteModuleController();
const deleteClassController = new DeleteClassController();
const updateModuleController = new UpdateModuleController();
const updateClassController = new UpdateClassController();

router.post("/users", UserController.store);
router.post("/login", AuthController.authenticate);
router.post("/modules", authMiddleware, createModuleController.store);
router.post("/classes", authMiddleware, createClassController.store);

router.get("/classes", listClassesController.list);
router.get("/modules", listModulesController.list);
router.get("/:id/classes", listClassInModuleController.list);

router.delete("/:id", authMiddleware, deleteModuleController.remove);
router.delete("/modules/:id", authMiddleware, deleteClassController.remove);

router.put("/:id", authMiddleware, updateModuleController.store);
router.put("/modules/:id", authMiddleware, updateClassController.store);

export default router;
