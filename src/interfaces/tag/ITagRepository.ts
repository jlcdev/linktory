import ITag from "./ITag"

export default interface ITagRepository
{
    getTags(propietaryId:string):Promise<ITag[]>
    getTagById(propietaryId:string, tagId:string):Promise<ITag|null>
    add(propietaryId:string, name:string):Promise<ITag|null>
    delete(propietaryId:string, tagId: string):Promise<boolean>
    deleteAllTagsOnLink(tagId:string):Promise<boolean>
}