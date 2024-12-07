import { PrismaClient } from "@prisma/client"
import ITag from "@interfaces/tag/ITag"
import ITagRepository from "@interfaces/tag/ITagRepository"

export default class TagRepository implements ITagRepository
{

    constructor(
        private readonly prisma:PrismaClient
    ){}

    async getTags(propietaryId: string): Promise<ITag[]>
    {
        try {
            const tags:ITag[] = await this.prisma.tag.findMany({where:{propietaryId}})
            return tags
        } catch (error) {
            return []
        }
    }

    async getTagById(propietaryId: string, tagId: string): Promise<ITag|null>
    {
        try {
            const tag:ITag|null = await this.prisma.tag.findUnique({where:{propietaryId, id:tagId}})
            return tag
        } catch (error) {
            return null
        }
    }

    async add(propietaryId: string, name: string):Promise<ITag|null>
    {
        try {
            const tag:ITag = await this.prisma.tag.create({
                data:{
                    name,
                    propietaryId
                }
            })
            return tag
        } catch (error) {
            return null
        }
    }

    async delete(propietaryId:string, tagId: string):Promise<boolean>
    {
        try {
            await this.prisma.tag.delete({where:{id:tagId, propietaryId}})
            return true
        } catch (error) {
            return false
        }
    }

    async deleteAllTagsOnLink(tagId: string):Promise<boolean>
    {
        try {
            await this.prisma.tagsOnLink.deleteMany({where:{ tagId }})
            return true
        } catch (error) {
            return false
        }
    }

}
