import ILink from "../../../src/interfaces/link/ILink"
import { ILinkUseCaseAddTagOnLink } from "../../../src/interfaces/link/ILinkUseCases"
import ITag from "../../../src/interfaces/tag/ITag"
import LinkService from "../../../src/services/LinkService"
import Validation from "../../../src/shared/Validation"
import LinkRepositoryMock from "../../mocks/LinkRepositoryMock"
import TagRepositoryMock from "../../mocks/TagRepositoryMock"

describe('Add tag on link Link Service', () => {
    
    describe('addTagOnLink', () => {

        test('When the tag is not found it should not be added to any link', async ()=>{
            const spyGetTagById = jest.spyOn(TagRepositoryMock, 'getTagById')
            spyGetTagById.mockImplementation(async ()=>{ return null})
            const spyFindById = jest.spyOn(LinkRepositoryMock, 'findById')
            const validation = new Validation()
            const linkService:ILinkUseCaseAddTagOnLink = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)

            const response = await linkService.addTagOnLink('1', '1', '1')

            expect(response).toBe(false)
            expect(spyGetTagById).toHaveBeenCalledTimes(1)
            expect(spyFindById).not.toHaveBeenCalled()
            spyGetTagById.mockRestore()
            spyFindById.mockRestore()
        })

        test('When the link is not found, no tag should be added', async ()=>{
            const spyGetTagById = jest.spyOn(TagRepositoryMock, 'getTagById')
            spyGetTagById.mockImplementation(async (userId, tagId)=>{
                const tag = {id:tagId, name:'tagName', propietaryId:userId, createdAt: new Date()} as ITag
                return tag
            })
            const spyFindById = jest.spyOn(LinkRepositoryMock, 'findById')
            spyFindById.mockImplementation(async ()=>{ return null })
            const validation = new Validation()
            const linkService:ILinkUseCaseAddTagOnLink = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)

            const response = await linkService.addTagOnLink('1', '1', '1')

            expect(response).toBe(false)
            expect(spyGetTagById).toHaveBeenCalledTimes(1)
            expect(spyFindById).toHaveBeenCalledTimes(1)
            spyGetTagById.mockRestore()
            spyFindById.mockRestore()
        })

        test('When the link already has the tag assigned, it should not be added again', async ()=>{
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
            const spyAdTagOnLink = jest.spyOn(LinkRepositoryMock, 'addTagOnLink')
            const validation = new Validation()
            const linkService:ILinkUseCaseAddTagOnLink = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)

            const response = await linkService.addTagOnLink('1', '1', '1')

            expect(response).toBe(false)
            expect(spyGetTagById).toHaveBeenCalledTimes(1)
            expect(spyFindById).toHaveBeenCalledTimes(1)
            expect(spyAdTagOnLink).not.toHaveBeenCalled()
            spyGetTagById.mockRestore()
            spyFindById.mockRestore()
            spyAdTagOnLink.mockRestore()
        })

        test('When all requirements are met you should be able to add the tag to a link', async ()=>{
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
            const spyAdTagOnLink = jest.spyOn(LinkRepositoryMock, 'addTagOnLink')
            spyAdTagOnLink.mockImplementation(async ()=>{
                return true
            })
            const validation = new Validation()
            const linkService:ILinkUseCaseAddTagOnLink = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)

            const response = await linkService.addTagOnLink('1', '1', '1')

            expect(response).toBe(true)
            expect(spyGetTagById).toHaveBeenCalledTimes(1)
            expect(spyFindById).toHaveBeenCalledTimes(1)
            expect(spyAdTagOnLink).toHaveBeenCalledTimes(1)
            spyGetTagById.mockRestore()
            spyFindById.mockRestore()
            spyAdTagOnLink.mockRestore()
        })

    })

})
        