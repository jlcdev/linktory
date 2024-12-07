import ITag from "@interfaces/tag/ITag"
import {
    ITagUseCaseGetById,
    ITagUseCaseGetAll,
    ITagUseCaseCreate,
    ITagUseCaseDelete
} from "@interfaces/tag/ITagUseCases"
import ITagRepository from "@interfaces/tag/ITagRepository"
import IValidation from "@interfaces/shared/IValidation"
import UseCaseException from "@exceptions/UseCaseException"

export default class TagService implements ITagUseCaseGetById, ITagUseCaseGetAll, ITagUseCaseCreate, ITagUseCaseDelete
{

    constructor(
        private readonly tagRepository:ITagRepository,
        private readonly validation:IValidation
    ){}

    async getById(userId:string, tagId: string): Promise<ITag|null>
    {
        try {
            const tag = await this.tagRepository.getTagById(userId, tagId)
            return tag
        } catch (error) {
            return null
        }
    }

    async getAll(userId:string):Promise<ITag[]>
    {
        try {
            return await this.tagRepository.getTags(userId)
        } catch (error) {
            return []
        }
    }

    async create(userId:string, name: string):Promise<ITag|null>
    {
        try {
            if(!this.validation.checkAlphanumeric(name)) throw new UseCaseException('Name should be alphanumeric value')
            const allTagsFromUser = await this.tagRepository.getTags(userId)
            const nameToCheck = name.trim().toLowerCase()
            const existTagInDatabase = allTagsFromUser.some((userTag:ITag)=> userTag.name.toLowerCase() == nameToCheck)
            if(existTagInDatabase) throw new UseCaseException('Tag already exist in database for that user')

            return await this.tagRepository.add(userId, name.trim())
        } catch (error) {
            return null
        }
    }

    async delete(userId:string, tagId: string):Promise<boolean>
    {
        try {
            const tagInDatabase:ITag|null = await this.tagRepository.getTagById(userId, tagId)
            if(tagInDatabase == null) return true // No tag in database -> is deleted
            const deletedRelatedTags = await this.tagRepository.deleteAllTagsOnLink(tagId) // Integrity (app && database)
            if(!deletedRelatedTags) throw new UseCaseException('Error cleaning related tags')
                
            return await this.tagRepository.delete(userId, tagId)
        } catch (error) {
            return false
        }
    }
    
}
