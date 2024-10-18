import { Validation } from "../../utils/security/validation.js";
import { userLoginSchema } from "./schemas/loginSchema.js";
import { userRegisterSchema } from "./schemas/registerSchema.js";
import { noteSchema } from "./schemas/noteSchema.js";
import { folderSchema } from "./schemas/folderSchema.js";

export const loginValidation = new Validation(userLoginSchema)
export const registerValidation = new Validation(userRegisterSchema); 
export const noteValidation = new Validation(noteSchema)
export const folderValidation = new Validation(folderSchema)    