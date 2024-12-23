import ILink from "@interfaces/link/ILink"
import ITag from "@interfaces/tag/ITag"
import {
    ILinkUseCaseGetAll,
    ILinkUseCaseCreate,
    ILinkUseCaseDelete,
    ILinkUseCaseAddTagOnLink,
    ILinkUseCaseDeleteTagOnLink
} from "@interfaces/link/ILinkUseCases"
import ILinkRepository from "@interfaces/link/ILinkRepository"
import ITagRepository from "@interfaces/tag/ITagRepository"
import IValidation from "@interfaces/shared/IValidation"
import UseCaseException from "@exceptions/UseCaseException"

export default class LinkService implements ILinkUseCaseGetAll, ILinkUseCaseCreate, ILinkUseCaseDelete, ILinkUseCaseAddTagOnLink, ILinkUseCaseDeleteTagOnLink
{

    constructor(
        private readonly linkRepository:ILinkRepository,
        private readonly tagRepository: ITagRepository,
        private readonly validation: IValidation
    ){}

    async getAll(userId:string):Promise<ILink[]>
    {
        try {
            return await this.linkRepository.findByPropietary(userId)
        } catch (error) {
            return []
        }
    }

    async create(userId:string, url: string, name: string):Promise<ILink|null>
    {
        try {
            if(!this.validation.checkURL(url)) throw new UseCaseException('invalid url')
            if(!this.validation.checkAlphanumeric(name)) throw new UseCaseException('Name for link should be alphanumeric')
            const nameToCheck = name.trim().toLowerCase()
            const userLinks:ILink[] = await this.linkRepository.findByPropietary(userId)
            const nameOrURLAlreadyExist = userLinks.some((link:ILink)=>{
                const existName = link.name.toLowerCase() == nameToCheck
                const existURL = link.url == url
                return existName || existURL
            })
            if(nameOrURLAlreadyExist) throw new UseCaseException('name or url already exist in database')
            return await this.linkRepository.add(userId, url.trim(), name.trim())
        } catch (error) {
            return null
        }
    }

    async delete(userId:string, linkId:string):Promise<boolean>
    {
        try {
            const link = await this.linkRepository.findById(userId, linkId)
            if(link == null) return true
            if(link.tags.length > 0){
                const deletedRelatedTags = await this.linkRepository.deleteAllTagsOnLink(linkId) // Integrity (app && database)
                if(!deletedRelatedTags) throw new UseCaseException('Error cleaning related tags')
            }
            return await this.linkRepository.delete(userId, linkId)
        } catch (error) {
            return false
        }
    }

    async addTagOnLink(userId:string, linkId:string, tagId:string):Promise<boolean>
    {
        try {
            const tag:ITag|null = await this.tagRepository.getTagById(userId, tagId)
            if(tag == null) throw new UseCaseException('Tag not found for user')
            const link:ILink|null = await this.linkRepository.findById(userId, linkId)
            if(link == null) throw new UseCaseException('Link not found for user')

            const existTagOnLink:boolean = link.tags.some((tagLink:ITag)=>{ return tagLink.id == tagId })
            if(existTagOnLink) throw new UseCaseException('Tag already exist on link')

            return await this.linkRepository.addTagOnLink(linkId, tagId)
        } catch (error) {
            return false
        }
    }

    async deleteTagOnLink(userId:string, linkId:string, tagId:string):Promise<boolean>
    {
        try {
            const tag:ITag|null = await this.tagRepository.getTagById(userId, tagId)
            if(tag == null) throw new UseCaseException('Tag not found for user')
            const link:ILink|null = await this.linkRepository.findById(userId, linkId)
            if(link == null) throw new UseCaseException('link not found for user')

            const tagIsInLink = link.tags.some((tagLink:ITag)=>{ return tagLink.id == tagId })
            if(!tagIsInLink) throw new UseCaseException('Tag to delete not in link')

            return await this.linkRepository.deleteTagOnLink(linkId, tagId)
        } catch (error) {
            return false
        }
    }
    
}
