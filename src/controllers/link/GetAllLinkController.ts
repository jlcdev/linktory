import { Request, Response } from "express"
import { ILinkUseCaseGetAll } from "@interfaces/link/ILinkUseCases"
import BaseController from "@controllers/BaseController"
import ControllerException from "@exceptions/ControllerException"

export default class GetAllLinkController extends BaseController
{

    constructor(
        private readonly linkService:ILinkUseCaseGetAll
    ){ super()}

    protected async implementation(req: Request, res: Response):Promise<Response|void>
    {
        const {userId} = <{userId:string}> req.body
        
        if(!userId) throw new ControllerException(403, 'Forbidden')
        const links = await this.linkService.getAll(userId)
        return res.status(200).json({
            status:200,
            timestamp: +new Date(),
            data:{
                links
            }
        })
    }

}
