import { Request, Response } from "express"
import {
    ITagUseCaseGetById,
    ITagUseCaseDelete
} from "@interfaces/tag/ITagUseCases"
import BaseController from "@controllers/BaseController"
import ControllerException from "@exceptions/ControllerException"


export default class DeleteTagController extends BaseController
{

    constructor(
        private readonly tagService:ITagUseCaseGetById&ITagUseCaseDelete
    ){super()}

    protected async implementation(req: Request, res: Response):Promise<Response|void>
    {
        const { userId } = <{userId:string|undefined}> req.body
        const {tagId} = <{tagId:string|undefined}> req.params
        if(!userId) throw new ControllerException(403, 'Forbidden')
        if(!tagId) throw new ControllerException(400, 'tagId is required')

        const result = await this.tagService.delete(userId, tagId)
        return res.status(200).json({
            status:200,
            timestamp: +new Date(),
            data:{
                deleted:result
            }
        })
    }

}
