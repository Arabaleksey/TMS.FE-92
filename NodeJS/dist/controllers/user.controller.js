"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_model_1 = require("../models/user.model");
class UserController {
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsUser = yield user_model_1.UserModel.findById(req.user.userId);
            if (!existsUser) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            return res.json(existsUser);
        });
    }
}
exports.userController = new UserController();
