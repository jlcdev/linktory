import ITag from "../../../src/interfaces/tag/ITag"
import TagService from "../../../src/services/TagService"
import TagRepositoryMock from "../../mocks/TagRepositoryMock"
import {ITagUseCaseGetById} from "../../../src/interfaces/tag/ITagUseCases"
import Validation from "../../../src/shared/Validation"

describe('Get by id Tag Service', ()=>{

    describe('getById', ()=>{

        test('When the tag is not found for that user the result should be null', async () => {
            const spyGetById = jest.spyOn(TagRepositoryMock, 'getTagById')
            spyGetById.mockImplementation(async ()=>{
                return null
            })
            const userId = '1'
            const validation = new Validation()
            const tagService:ITagUseCaseGetById = new TagService(TagRepositoryMock, validation)

            const response = await tagService.getById(userId, '1')

            expect(response).toBeNull()
            spyGetById.mockRestore()
        })

        test('When the user has a tag with the defined id a tag object should be returned', async () => {
            const spyGetById = jest.spyOn(TagRepositoryMock, 'getTagById')
            spyGetById.mockImplementation(async (propietaryId, tagId)=>{
                const tag = {id:tagId, propietaryId, name:'test', createdAt: new Date()} as ITag
                return tag
            })
            const userId = '1'
            const tagId = '1'
            const validation = new Validation()
            const tagService:ITagUseCaseGetById = new TagService(TagRepositoryMock, validation)

            const response = await tagService.getById(userId, '1')

            expect(response).not.toBeNull()
            expect(response!.propietaryId).toBe(userId)
            expect(response!.id).toBe(tagId)
            spyGetById.mockRestore()
        })
        
    })

})
