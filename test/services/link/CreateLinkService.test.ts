import ILink from "../../../src/interfaces/link/ILink"
import { ILinkUseCaseCreate } from "../../../src/interfaces/link/ILinkUseCases"
import LinkService from "../../../src/services/LinkService"
import Validation from "../../../src/shared/Validation"
import LinkRepositoryMock from "../../mocks/LinkRepositoryMock"
import TagRepositoryMock from "../../mocks/TagRepositoryMock"

describe('Create Link Service', () => {
    
    describe('create', () => {

        test('When the URL entered is incorrect or malformed, a link should not be created', async ()=>{
            const spyFindByPropietary = jest.spyOn(LinkRepositoryMock, 'findByPropietary')
            const validation = new Validation()
            const linkService:ILinkUseCaseCreate = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)
            const url = 'test'
            const name = 'test'

            const response = await linkService.create('1', url, name)

            expect(response).toBeNull()
            expect(spyFindByPropietary).not.toHaveBeenCalled()
            spyFindByPropietary.mockRestore()
        })

        test('When the link name does not meet the acceptance criteria, a link should not be created', async ()=>{
            const spyFindByPropietary = jest.spyOn(LinkRepositoryMock, 'findByPropietary')
            const validation = new Validation()
            const linkService:ILinkUseCaseCreate = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)
            const url = 'http://www.test.com/'
            const name = '#test'

            const response = await linkService.create('1', url, name)

            expect(response).toBeNull()
            expect(spyFindByPropietary).not.toHaveBeenCalled()
            spyFindByPropietary.mockRestore()
        })

        test('When the link already exists, a link should not be created again', async ()=>{
            const spyFindByPropietary = jest.spyOn(LinkRepositoryMock, 'findByPropietary')
            spyFindByPropietary.mockImplementation(async ()=>{
                const link = {id:'1', url:'http://www.test.com/', name:'test', propietaryId:'1', createdAt: new Date(), updatedAt: new Date()} as ILink
                return [link]
            })
            const spyAdd = jest.spyOn(LinkRepositoryMock, 'add')
            const validation = new Validation()
            const linkService:ILinkUseCaseCreate = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)
            const url = 'http://www.test.com/'
            const name = 'test1'

            const response = await linkService.create('1', url, name)

            expect(response).toBeNull()
            expect(spyFindByPropietary).toHaveBeenCalled()
            expect(spyAdd).not.toHaveBeenCalled()
            spyFindByPropietary.mockRestore()
            spyAdd.mockRestore()
        })

        test('When the name already exists, a link should not be created again', async ()=>{
            const spyFindByPropietary = jest.spyOn(LinkRepositoryMock, 'findByPropietary')
            spyFindByPropietary.mockImplementation(async ()=>{
                const link = {id:'1', url:'http://www.test.com/', name:'test', propietaryId:'1', createdAt: new Date(), updatedAt: new Date()} as ILink
                return [link]
            })
            const spyAdd = jest.spyOn(LinkRepositoryMock, 'add')
            const validation = new Validation()
            const linkService:ILinkUseCaseCreate = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)
            const url = 'http://www.other.com/'
            const name = 'test'

            const response = await linkService.create('1', url, name)

            expect(response).toBeNull()
            expect(spyFindByPropietary).toHaveBeenCalled()
            expect(spyAdd).not.toHaveBeenCalled()
            spyFindByPropietary.mockRestore()
            spyAdd.mockRestore()
        })

        test('When all the link information is correct and not duplicated it should be added to the system', async ()=>{
            const spyFindByPropietary = jest.spyOn(LinkRepositoryMock, 'findByPropietary')
            spyFindByPropietary.mockImplementation(async ()=>{
                const link = {id:'1', url:'http://www.test.com/', name:'test', propietaryId:'1', createdAt: new Date(), updatedAt: new Date()} as ILink
                return [link]
            })
            const spyAdd = jest.spyOn(LinkRepositoryMock, 'add')
            spyAdd.mockImplementation(async (userId, url, name)=>{
                const link = {id:'1', url, name, propietaryId:userId, createdAt: new Date(), updatedAt: new Date()} as ILink
                return link
            })
            const validation = new Validation()
            const linkService:ILinkUseCaseCreate = new LinkService(LinkRepositoryMock, TagRepositoryMock, validation)
            const url = 'http://www.other.com/'
            const name = 'other'

            const response = await linkService.create('1', url, name)
            
            expect(response).not.toBeNull()
            expect(response!.url).toBe(url)
            expect(response!.name).toBe(name)
            expect(spyFindByPropietary).toHaveBeenCalledTimes(1)
            expect(spyAdd).toHaveBeenCalledTimes(1)
            spyFindByPropietary.mockRestore()
            spyAdd.mockRestore()
        })

    })

})