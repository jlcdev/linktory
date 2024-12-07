import ITag from "./ITag"

export interface ITagUseCaseGetById
{
    getById(userId:string, tagId:string):Promise<ITag|null>
}

export interface ITagUseCaseGetAll
{
    getAll(userId:string):Promise<ITag[]>
}

export interface ITagUseCaseCreate
{
    create(userId:string, name:string):Promise<ITag|null>
}

export interface ITagUseCaseDelete
{
    delete(userId:string, tagId:string):Promise<boolean>
}
