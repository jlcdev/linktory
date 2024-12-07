import { Request, Response } from "express"
import { IUserUseCaseRegister } from "@interfaces/user/IUserUseCases"
import BaseController from "@controllers/BaseController"
import ControllerException from "@exceptions/ControllerException"

export default class RegisterUserController extends BaseController
{

    constructor(
        private readonly userService:IUserUseCaseRegister,
    ){
        super()
        if(!process.env.USER_REGISTER_ALLOWED) new Error('USER_REGISTER_ALLOWED is not defined')
    }

    protected async implementation(req: Request, res: Response): Promise<Response>
    {
        // Get required fields from body
        const {email, password} = <{email:string|undefined, password:string|undefined}> req.body
        if(!email) throw new ControllerException(400, 'email field is required')
        if(!password) throw new ControllerException(400, 'password field is required')
        // Check if register new users are allowed
        const USER_REGISTER_ALLOWED = !!+process.env.USER_REGISTER_ALLOWED!
        if(!USER_REGISTER_ALLOWED) throw new ControllerException(400, 'Currently user registration is disabled')
        // Create user
        const user = await this.userService.register(email, password)
        if(user == null) return res.status(400).json({status:400, msg:'Account not created'})
        return res.status(200).json({
            status:200,
            timestamp: +new Date(),
            data:{
                user:{
                    id:user.id,
                    email:user.email,
                    createdAt:user.createdAt
                }
            }
        })
    }

}
