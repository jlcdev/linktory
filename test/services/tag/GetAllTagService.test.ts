import ITag from "../../../src/interfaces/tag/ITag"
import {ITagUseCaseGetAll} from "../../../src/interfaces/tag/ITagUseCases"
import TagService from "../../../src/services/TagService"
import Validation from "../../../src/shared/Validation"
import TagRepositoryMock from "../../mocks/TagRepositoryMock"

describe('Get all Tag Service', () => {

    describe('getAll', () => {

        test('When the user has no tags the result should be an empty list', async () => {
            const spyGetTags = jest.spyOn(TagRepositoryMock, 'getTags')
            spyGetTags.mockImplementation(async ()=>{
                return []
            })
            const userId = '1'
            const validation = new Validation()
            const tagService: ITagUseCaseGetAll = new TagService(TagRepositoryMock, validation)

            const response = await tagService.getAll(userId)

            expect(response).not.toBeNull()
            expect(response.length).toBe(0)
            spyGetTags.mockRestore()
        })

        test('When the user has tags in the system the result should be a list with them', async () => {
            const spyGetTags = jest.spyOn(TagRepositoryMock, 'getTags')
            spyGetTags.mockImplementation(async ()=>{
                const tag = {id:'1', propietaryId:'1', name:'test', createdAt: new Date()} as ITag
                return [tag]
            })
            const userId = '1'
            const validation = new Validation()
            const tagService: ITagUseCaseGetAll = new TagService(TagRepositoryMock, validation)

            const response = await tagService.getAll(userId)

            expect(response).not.toBeNull()
            expect(response.length).toBeGreaterThan(0)
            spyGetTags.mockRestore()
        })
        
    })
    
})
