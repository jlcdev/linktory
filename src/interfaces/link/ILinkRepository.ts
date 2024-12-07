import ILink from "./ILink"

export default interface ILinkRepository
{
    findByPropietary(propietaryId:string):Promise<ILink[]>
    findById(propietaryId:string, linkId:string):Promise<ILink|null>
    add(propietaryId:string, url:string, name:string):Promise<ILink|null>
    delete(propietaryId:string, linkId:string):Promise<boolean>
    addTagOnLink(linkId:string, tagId:string):Promise<boolean>
    deleteTagOnLink(linkId:string, tagId:string):Promise<boolean>
    deleteAllTagsOnLink(linkId:string):Promise<boolean>
}