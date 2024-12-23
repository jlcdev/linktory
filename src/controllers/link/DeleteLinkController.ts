import { Request, Response } from "express"
import { ILinkUseCaseDelete } from "@interfaces/link/ILinkUseCases"
import BaseController from "@controllers/BaseController"
import ControllerException from "@exceptions/ControllerException"

export default class DeleteLinkController extends BaseController
{
    constructor(
        private readonly linkService:ILinkUseCaseDelete
    ){ super()}

    protected async implementation(req: Request, res: Response): Promise<Response|void>
    {
        const {userId} = <{userId:string|undefined}> req.body
        const {linkId} = <{linkId:string|undefined}> req.params
        if(!userId) throw new ControllerException(403, 'Forbidden')
        if(!linkId) throw new ControllerException(400, 'linkId field is required in params')

        const deleted = await this.linkService.delete(userId, linkId)
        return res.status(200).json({
            status:200,
            timestamp: +new Date(),
            data:{
                deleted
            }
        })
    }

}
