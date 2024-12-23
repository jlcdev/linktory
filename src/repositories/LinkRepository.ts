import { PrismaClient } from "@prisma/client"
import ILink from "@interfaces/link/ILink"
import ITag from "@interfaces/tag/ITag"
import ILinkRepository from "@interfaces/link/ILinkRepository"

export default class LinkRepository implements ILinkRepository
{

    constructor(
        private readonly prisma:PrismaClient
    ){}

    async findByPropietary(propietaryId: string):Promise<ILink[]>
    {
        try {
            const linksDB = await this.prisma.link.findMany({
                where:{ propietaryId },
                include:{
                    tags:{
                        include:{ tag:true }
                    }
                }
            })

            return linksDB.map((link)=>{
                const tags:ITag[] = link.tags.map((tagRelation)=>{ return tagRelation.tag })
                const {id, name, propietaryId, url, createdAt, updatedAt} = link
                return { id, name, propietaryId, url, tags, createdAt, updatedAt } as ILink
            }) as ILink[]
        } catch (error) {
            return []
        }
    }

    async findById(userId: string, linkId: string):Promise<ILink|null>
    {
        try {
            const link = await this.prisma.link.findFirst({
                where:{ propietaryId:userId, id:linkId },
                include:{
                    tags:{
                        include:{ tag:true }
                    }
                }
            })
            if(link == null) throw new Error('link not found')
            const tags:ITag[] = link.tags.map((tagRelation)=>{ return tagRelation.tag})
            const {id, name, propietaryId, url, createdAt, updatedAt} = link
            return { id, name, propietaryId, url, tags, createdAt, updatedAt } as ILink
        } catch (error) {
            return null
        }
    }

    async add(propietaryId: string, url: string, name: string):Promise<ILink|null>
    {
        try {
            const link = await this.prisma.link.create({
                data:{ propietaryId, url, name }
            })

            return {
                id:link.id,
                url:link.url,
                name:link.name,
                propietaryId:link.propietaryId,
                createdAt:link.createdAt,
                updatedAt:link.updatedAt
            } as ILink
        } catch (error) {
            return null
        }
    }

    async delete(propietaryId: string, linkId: string):Promise<boolean>
    {
        try {
            await this.prisma.link.delete({where:{ propietaryId, id:linkId }})
            return true
        } catch (error) {
            return false
        }
    }

    async addTagOnLink(linkId: string, tagId: string):Promise<boolean>
    {
        try {
            await this.prisma.tagsOnLink.create({
                data:{ linkId, tagId }
            })
            return true
        } catch (error) {
            return false
        }
    }

    async deleteTagOnLink(linkId: string, tagId: string):Promise<boolean>
    {
        try {
            await this.prisma.tagsOnLink.delete({
                where:{
                    linkId_tagId:{ linkId, tagId }
                }
            })
            return true
        } catch (error) {
            return false
        }
    }

    async deleteAllTagsOnLink(linkId: string):Promise<boolean>
    {
        try {
            await this.prisma.tagsOnLink.deleteMany({where:{ linkId }})
            return true
        } catch (error) {
            return false
        }
    }

}
