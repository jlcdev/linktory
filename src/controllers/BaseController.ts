import { Request, Response } from "express"
import ControllerException from "@exceptions/ControllerException"

export default abstract class BaseController
{

    constructor(){
        this.run = this.run.bind(this)
    }

    protected abstract implementation(req:Request, res:Response):Promise<Response|void>

    public async run(req:Request, res:Response):Promise<void>
    {
        try{
            await this.implementation(req, res)
        }catch(error){
            if(error instanceof ControllerException){
                const controllerError = error as ControllerException
                res.status(controllerError.getCode()).json(controllerError.getJSON())
            }else{
                res.status(500).json({
                    status:500,
                    message:'Internal Server Error'
                })
            }
        }
    }

}
