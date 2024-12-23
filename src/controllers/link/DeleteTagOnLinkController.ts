import { Request, Response } from "express"
import { ILinkUseCaseDeleteTagOnLink } from "@interfaces/link/ILinkUseCases"
import BaseController from "@controllers/BaseController"
import ControllerException from "@exceptions/ControllerException"

export default class DeleteTagOnLinkController extends BaseController
{

    constructor(
        private readonly linkService:ILinkUseCaseDeleteTagOnLink
    ){ super()}

    protected async implementation(req: Request, res: Response): Promise<Response|void>
    {
        const {userId} = <{userId:string|undefined}> req.body
        const {linkId, tagId} = <{linkId:string|undefined, tagId:string|undefined}> req.params
        if(!userId) throw new ControllerException(403, 'Forbidden')
        if(!linkId) throw new ControllerException(400, 'linkId field is required')
        if(!tagId) throw new ControllerException(400, 'tagId field is required')

        const deleted = await this.linkService.deleteTagOnLink(userId, linkId, tagId)
        return res.status(200).json({
            status:200,
            timestamp: +new Date(),
            data:{
                deleted
            }
        })
    }

}
