import { Request, Response } from "express"
import { ITagUseCaseCreate } from "@interfaces/tag/ITagUseCases"
import BaseController from "@controllers/BaseController"
import ControllerException from "@exceptions/ControllerException"

export default class CreateTagController extends BaseController
{

    constructor(
        private readonly tagService:ITagUseCaseCreate
    ){super()}

    protected async implementation(req: Request, res: Response):Promise<Response|void>
    {
        const { userId, name } = <{userId:string|undefined, name:string|undefined}> req.body
        if(!userId) throw new ControllerException(403, 'Forbidden')
        if(!name) throw new ControllerException(400, 'Name field is required')
        
        const tag = await this.tagService.create(userId, name)

        if(!tag) throw new ControllerException(400, 'Tag not created')
            
        return res.status(200).json({
            status:200,
            timestamp: +new Date(),
            data:{
                tag
            }
        })
    }

}
