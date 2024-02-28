import { User } from "../models/userModel.js";
import { dirname, resolve, join } from "path";
import { fileURLToPath } from "url";
import {
  getAllFactory,
  createFactory,
  getElementByIdFactory,
  updateElementByIdFactory,
  deleteElementByIdFactory,
} from "../utils/crudFactory.js";

/** Route handlers */
function homeHandler(req, res, next) {
  let dirName = dirname(fileURLToPath(import.meta.url));
  dirName = resolve(join(dirName, ".."));
  res.sendFile(dirName + "/views/home.html");
}
const getUserHandler = getAllFactory(User);
const addUserHandler = createFactory(User);
const getUserByIdHandler = getElementByIdFactory(User);
const updateUserByIdHandler = updateElementByIdFactory(User);
const deleteUserByIdHandler = deleteElementByIdFactory(User);

export {
  homeHandler,
  getUserHandler,
  addUserHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
};
