import ILink from "../../../src/interfaces/link/ILink"
import { ILinkUseCaseGetAll } from "../../../src/interfaces/link/ILinkUseCases"
import LinkService from "../../../src/services/LinkService"
import Validation from "../../../src/shared/Validation"
import LinkRepositoryMock from "../../mocks/LinkRepositoryMock"
import TagRepositoryMock from "../../mocks/TagRepositoryMock"

describe('Get all Link Service', () => {
    
    describe('getAll', () => {
        
        test('When the user has no links the result should be an empty list', async ()=>{
            const spyFindByPropietary = jest.spyOn(LinkRepositoryMock, 'findByPropietary')
            spyFindByPropietary.mockImplementation(async ()=>{
                return []
            })
            const userId = '1'
            const validation = new Validation()
            const linkService:ILinkUseCaseGetAll = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)

            const response = await linkService.getAll(userId)

            expect(response).not.toBeNull()
            expect(response.length).toBe(0)
            spyFindByPropietary.mockRestore()
        })

        test('When the user has links the result should be a list with them', async ()=>{
            const spyFindByPropietary = jest.spyOn(LinkRepositoryMock, 'findByPropietary')
            spyFindByPropietary.mockImplementation(async ()=>{
                const link = {id:'1', url:'http://test.com', name:'test', propietaryId:'1', createdAt: new Date(), updatedAt: new Date()} as ILink
                return [link]
            })
            const userId = '1'
            const validation = new Validation()
            const linkService:ILinkUseCaseGetAll = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)

            const response = await linkService.getAll(userId)

            expect(response).not.toBeNull()
            expect(response.length).toBeGreaterThan(0)
            spyFindByPropietary.mockRestore()
        })
        
    })
    
})
