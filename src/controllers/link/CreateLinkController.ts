import { Request, Response } from "express"
import { ILinkUseCaseCreate } from "@interfaces/link/ILinkUseCases"
import BaseController from "@controllers/BaseController"
import ControllerException from "@exceptions/ControllerException"

export default class CreateLinkController extends BaseController
{

    constructor(
        private readonly linkService:ILinkUseCaseCreate
    ){ super()}

    protected async implementation(req: Request, res: Response):Promise<Response|void>
    {
        const { userId, url, name} = <{userId:string|undefined, url:string|undefined, name:string|undefined}> req.body
        if(!userId) throw new ControllerException(403, 'Forbidden')
        if(!url) throw new ControllerException(400, 'url field is required')
        if(!name) throw new ControllerException(400, 'name field is required')

        const link = await this.linkService.create(userId, url, name)
        if(!link) throw new ControllerException(400, 'Link not created')
        return res.status(200).json({
            status:200,
            timestamp: +new Date(),
            data:{
                link
            }
        })
    }
    
}
