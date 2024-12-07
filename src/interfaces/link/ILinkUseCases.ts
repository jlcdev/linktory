import IUser from "@interfaces/user/IUser"
import ILink from "./ILink"

export interface ILinkUseCaseGetAll
{
    getAll(userId:string):Promise<ILink[]>
}

export interface ILinkUseCaseCreate
{
    create(userId:string, url:string, name:string):Promise<ILink|null>
}

export interface ILinkUseCaseDelete
{
    delete(userId:string, linkId:string):Promise<boolean>
}

export interface ILinkUseCaseAddTagOnLink
{
    addTagOnLink(userId:string, linkId:string, tagId:string):Promise<boolean>
}

export interface ILinkUseCaseDeleteTagOnLink
{
    deleteTagOnLink(userId:string, linkId:string, tagId:string):Promise<boolean>
}
