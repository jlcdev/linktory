import { Request, Response } from "express"
import { ITagUseCaseGetAll } from "@interfaces/tag/ITagUseCases"
import BaseController from "@controllers/BaseController"
import ControllerException from "@exceptions/ControllerException"

export default class GetAllTagController extends BaseController
{

    constructor(
        private readonly tagService:ITagUseCaseGetAll
    ){super()}

    protected async implementation(req: Request, res: Response): Promise<Response|void>
    {
        const { userId } = <{userId:string|undefined}> req.body
        if(!userId) throw new ControllerException(403, 'Forbidden')
        const tags = await this.tagService.getAll(userId)
        return res.status(200).json({
            status:200,
            timestamp: +new Date(),
            data:{
                tags
            }
        })
    }

}
