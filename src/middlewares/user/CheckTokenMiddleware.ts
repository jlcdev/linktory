import { Request, Response, NextFunction } from "express"
import BaseMiddleware from "@middlewares/BaseMiddleware"
import ISecurity from "@interfaces/shared/ISecurity"

export default class CheckTokenMiddleware extends BaseMiddleware
{

    constructor(
        private readonly security:ISecurity
    ){
        super()
    }


    protected async implementation(req: Request, res: Response, next: NextFunction):Promise<Response|void>
    {
        const authHeader:string|undefined = req.headers['authorization']
        const token = authHeader? authHeader.split(' ')[1]:null // Bearer <token>
        if (token == null) return res.status(401).json({ status:401, message:'Token is required'})
        const userId:string|null = this.security.verifyJWT(token, process.env.USER_CREDENTIAL_SECRET!)
        req.body.userId = userId
        return next()
    }

}