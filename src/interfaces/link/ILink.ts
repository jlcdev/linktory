import ITag from "@interfaces/tag/ITag"

export default interface ILink
{
    readonly id:string,
    readonly propietaryId:string,
    readonly url:string,
    readonly name:string,
    readonly tags:ITag[],
    readonly createdAt:Date,
    readonly updatedAt:Date
}
