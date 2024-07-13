import { SuccessHandlerUtil } from "../utils"
import { UserService } from "../services";
import { Request, Response, NextFunction } from 'express';  // Import types

export default class UserController {
    static async getUser(req:Request, res: Response, next: NextFunction){
        try {
            // get user controller body
        } catch (error) {
            next(error)
        }
    }
    static async addUser(req:Request, res: Response, next: NextFunction){
        try {
           // add user controller body
        } catch (error) {
            next(error)
        }
    }
}