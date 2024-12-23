import ILink from "../../../src/interfaces/link/ILink"
import { ILinkUseCaseDelete } from "../../../src/interfaces/link/ILinkUseCases"
import ITag from "../../../src/interfaces/tag/ITag"
import LinkService from "../../../src/services/LinkService"
import Validation from "../../../src/shared/Validation"
import LinkRepositoryMock from "../../mocks/LinkRepositoryMock"
import TagRepositoryMock from "../../mocks/TagRepositoryMock"

describe('Delete Link Service', () => {
    
    describe('delete', () => {

        test('si no hay link a borrar -> true', async ()=>{
            const spyFindById = jest.spyOn(LinkRepositoryMock, 'findById')
            spyFindById.mockImplementation(async ()=>{ return null })
            const spyDeleteAllTagsOnLink = jest.spyOn(LinkRepositoryMock, 'deleteAllTagsOnLink')
            const spyDelete = jest.spyOn(LinkRepositoryMock, 'delete')
            const validation = new Validation()
            const linkService:ILinkUseCaseDelete = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)

            const response = await linkService.delete('1', '1')

            expect(response).toBe(true)
            expect(spyFindById).toHaveBeenCalledTimes(1)
            expect(spyDeleteAllTagsOnLink).not.toHaveBeenCalled()
            expect(spyDelete).not.toHaveBeenCalled()
            spyFindById.mockRestore()
            spyDeleteAllTagsOnLink.mockRestore()
            spyDelete.mockRestore()
        })

        test('si no se han borrado todos los tags asociados -> false', async ()=>{
            const spyFindById = jest.spyOn(LinkRepositoryMock, 'findById')
            spyFindById.mockImplementation(async (userId, linkId)=>{
                const link = {id:linkId, tags:[{id:'1', name:'tagName', propietaryId:userId, createdAt: new Date()} as ITag], url:'http://www.test.com', name:'tagName', propietaryId:userId, createdAt: new Date(), updatedAt: new Date()} as ILink
                return link
            })
            const spyDeleteAllTagsOnLink = jest.spyOn(LinkRepositoryMock, 'deleteAllTagsOnLink')
            const spyDelete = jest.spyOn(LinkRepositoryMock, 'delete')
            const validation = new Validation()
            const linkService:ILinkUseCaseDelete = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)

            const response = await linkService.delete('1', '1')

            expect(response).toBe(false)
            expect(spyFindById).toHaveBeenCalledTimes(1)
            expect(spyDeleteAllTagsOnLink).toHaveBeenCalledTimes(1)
            expect(spyDelete).not.toHaveBeenCalled()
            spyFindById.mockRestore()
            spyDeleteAllTagsOnLink.mockRestore()
            spyDelete.mockRestore()
        })

        test('si todo va bien -> true', async ()=>{
            const spyFindById = jest.spyOn(LinkRepositoryMock, 'findById')
            spyFindById.mockImplementation(async (userId, linkId)=>{
                const link = {id:linkId, tags:[], url:'http://www.test.com', name:'tagName', propietaryId:userId, createdAt: new Date(), updatedAt: new Date()} as ILink
                return link
            })
            const spyDeleteAllTagsOnLink = jest.spyOn(LinkRepositoryMock, 'deleteAllTagsOnLink')
            const spyDelete = jest.spyOn(LinkRepositoryMock, 'delete')
            spyDelete.mockImplementation(async ()=>{ return true })
            const validation = new Validation()
            const linkService:ILinkUseCaseDelete = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)

            const response = await linkService.delete('1', '1')

            expect(response).toBe(true)
            expect(spyFindById).toHaveBeenCalledTimes(1)
            expect(spyDeleteAllTagsOnLink).not.toHaveBeenCalled()
            expect(spyDelete).toHaveBeenCalledTimes(1)
            spyFindById.mockRestore()
            spyDeleteAllTagsOnLink.mockRestore()
            spyDelete.mockRestore()
        })

    })

})