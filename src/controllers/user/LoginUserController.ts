import { Request, Response } from "express"
import ISecurity from "@interfaces/shared/ISecurity"
import { IUserUseCaseLogin } from "@interfaces/user/IUserUseCases"
import BaseController from "@controllers/BaseController"
import ControllerException from "@exceptions/ControllerException"

export default class LoginUserController extends BaseController
{

    constructor(
        private readonly userService:IUserUseCaseLogin,
        private readonly security:ISecurity
    ){
        super()
        if(!process.env.USER_CREDENTIAL_SECRET) new Error('USER_CREDENTIAL_SECRET is not defined')
        if(!process.env.USER_CREDENTIAL_EXPIRATION_DAYS) new Error('USER_CREDENTIAL_SECRET is not defined')
    }

    protected async implementation(req: Request, res: Response): Promise<Response>
    {
        // Get required fields from body
        const { email, password } = <{email:string|undefined, password:string|undefined}> req.body
        if(!email) throw new ControllerException(400, 'email field is required')
        if(!password) throw new ControllerException(400, 'password field is required')
        // Run login logic
        const user = await this.userService.login(email, password)
        if(user == null) throw new ControllerException(400, 'Email or password fields are incorrect')
        // Generate user credentials
        const token:string = this.security.createJWT(user.id, process.env.USER_CREDENTIAL_SECRET!, { expiresIn:`${process.env.USER_CREDENTIAL_EXPIRATION_DAYS!}d` })
        return res.status(200).json({
            status:200,
            timestamp: +new Date(),
            data:{
                token
            }
        })

    }
    
}
