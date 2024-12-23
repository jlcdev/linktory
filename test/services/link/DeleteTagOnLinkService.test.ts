import ILink from "../../../src/interfaces/link/ILink"
import { ILinkUseCaseDeleteTagOnLink } from "../../../src/interfaces/link/ILinkUseCases"
import ITag from "../../../src/interfaces/tag/ITag"
import LinkService from "../../../src/services/LinkService"
import Validation from "../../../src/shared/Validation"
import LinkRepositoryMock from "../../mocks/LinkRepositoryMock"
import TagRepositoryMock from "../../mocks/TagRepositoryMock"

describe('Delete tag on link Link Service', () => {
    
    describe('deleteTagOnLink', () => {

        test('no encuentro tag -> false', async ()=>{
            const spyGetTagById = jest.spyOn(TagRepositoryMock, 'getTagById')
            spyGetTagById.mockImplementation(async ()=>{ return null})
            const spyFindById = jest.spyOn(LinkRepositoryMock, 'findById')
            const validation = new Validation()
            const linkService:ILinkUseCaseDeleteTagOnLink = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)

            const response = await linkService.deleteTagOnLink('1', '1', '1')

            expect(response).toBe(false)
            expect(spyGetTagById).toHaveBeenCalledTimes(1)
            expect(spyFindById).not.toHaveBeenCalled()
            spyGetTagById.mockRestore()
        })

        test('no encuentro link -> true', async ()=>{
            const spyGetTagById = jest.spyOn(TagRepositoryMock, 'getTagById')
            spyGetTagById.mockImplementation(async (userId, tagId)=>{
                const tag = {id:tagId, name:'tagName', propietaryId:userId, createdAt: new Date()} as ITag
                return tag
            })
            const spyFindById = jest.spyOn(LinkRepositoryMock, 'findById')
            spyFindById.mockImplementation(async ()=>{ return null })
            const validation = new Validation()
            const linkService:ILinkUseCaseDeleteTagOnLink = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)

            const response = await linkService.deleteTagOnLink('1', '1', '1')

            expect(response).toBe(false)
            expect(spyGetTagById).toHaveBeenCalledTimes(1)
            expect(spyFindById).toHaveBeenCalledTimes(1)
            spyGetTagById.mockRestore()
            spyFindById.mockRestore()
        })

        test('no hay tag a eliminar -> false', async ()=>{
            const spyGetTagById = jest.spyOn(TagRepositoryMock, 'getTagById')
            spyGetTagById.mockImplementation(async (userId, tagId)=>{
                const tag = {id:tagId, name:'tagName', propietaryId:userId, createdAt: new Date()} as ITag
                return tag
            })
            const spyFindById = jest.spyOn(LinkRepositoryMock, 'findById')
            spyFindById.mockImplementation(async (userId, linkId)=>{
                const link = {id:linkId, tags:[], url:'http://www.test.com', name:'tagName', propietaryId:userId, createdAt: new Date(), updatedAt: new Date()} as ILink
                return link
            })
            const spyDeleteTagOnLink = jest.spyOn(LinkRepositoryMock, 'deleteTagOnLink')
            const validation = new Validation()
            const linkService:ILinkUseCaseDeleteTagOnLink = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)

            const response = await linkService.deleteTagOnLink('1', '1', '1')

            expect(response).toBe(false)
            expect(spyGetTagById).toHaveBeenCalledTimes(1)
            expect(spyFindById).toHaveBeenCalledTimes(1)
            expect(spyDeleteTagOnLink).not.toHaveBeenCalled()
            spyGetTagById.mockRestore()
            spyFindById.mockRestore()
            spyDeleteTagOnLink.mockRestore()
        })

        test('el tag se quita del link -> true', async ()=>{
            const spyGetTagById = jest.spyOn(TagRepositoryMock, 'getTagById')
            spyGetTagById.mockImplementation(async (userId, tagId)=>{
                const tag = {id:tagId, name:'tagName', propietaryId:userId, createdAt: new Date()} as ITag
                return tag
            })
            const spyFindById = jest.spyOn(LinkRepositoryMock, 'findById')
            spyFindById.mockImplementation(async (userId, linkId)=>{
                const link = {id:linkId, tags:[{id:'1', name:'tagName', propietaryId:'1', createdAt: new Date()} as ITag], url:'http://www.test.com', name:'tagName', propietaryId:userId, createdAt: new Date(), updatedAt: new Date()} as ILink
                return link
            })
            const spyDeleteTagOnLink = jest.spyOn(LinkRepositoryMock, 'deleteTagOnLink')
            spyDeleteTagOnLink.mockImplementation(async ()=>{
                return true
            })
            const validation = new Validation()
            const linkService:ILinkUseCaseDeleteTagOnLink = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)

            const response = await linkService.deleteTagOnLink('1', '1', '1')

            expect(response).toBe(true)
            expect(spyGetTagById).toHaveBeenCalledTimes(1)
            expect(spyFindById).toHaveBeenCalledTimes(1)
            expect(spyDeleteTagOnLink).toHaveBeenCalledTimes(1)
            spyGetTagById.mockRestore()
            spyFindById.mockRestore()
            spyDeleteTagOnLink.mockRestore()
        })

    })

})