import { Request, Response, NextFunction } from "express"

export default abstract class BaseMiddleware
{
    constructor(){
        this.run = this.run.bind(this)
    }

    protected abstract implementation(req:Request, res:Response, next:NextFunction):Promise<Response|void>

    public async run(req:Request, res:Response, next:NextFunction):Promise<void>
    {
        try{
            await this.implementation(req, res, next)
        }catch(error){
            res.status(500).json({
                status:500,
                message:'Internal Server Error'
            })
        }
    }
}