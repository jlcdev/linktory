import ITag from "../../../src/interfaces/tag/ITag"
import { ITagUseCaseCreate } from "../../../src/interfaces/tag/ITagUseCases"
import TagService from "../../../src/services/TagService"
import Validation from "../../../src/shared/Validation"
import TagRepositoryMock from "../../mocks/TagRepositoryMock"

describe('Add TagService', () => {

    describe('add', () => {

        test('When the tag name is alphanumeric it should not be added to the system', async ()=>{
            const userId = '1'
            const spyAdd = jest.spyOn(TagRepositoryMock, 'add')
            const validation = new Validation()
            const tagService:ITagUseCaseCreate = new TagService(TagRepositoryMock, validation)
            const tagName = 'test@'
            const response = await tagService.create(userId, tagName)

            expect(response).toBeNull()
            expect(spyAdd).not.toHaveBeenCalled()
            spyAdd.mockRestore()
        })

        test('When the tag already exists it should not be added', async ()=>{
            const userId = '1'
            const spyGetTags = jest.spyOn(TagRepositoryMock, 'getTags')
            spyGetTags.mockImplementation(async (propietaryId)=>{
                const tag = {id:'1', propietaryId, name:'test'} as ITag
                return [tag]
            })
            const spyAdd = jest.spyOn(TagRepositoryMock, 'add')
            const validation = new Validation()
            const tagService:ITagUseCaseCreate = new TagService(TagRepositoryMock, validation)
            const tagName = 'test'

            const response = await tagService.create(userId, tagName)

            expect(response).toBeNull()
            expect(spyGetTags).toHaveBeenCalledTimes(1)
            expect(spyAdd).not.toHaveBeenCalled()
            spyGetTags.mockRestore()
        })

        test('When the tag is correct and is not in the system it should be added', async ()=>{
            const userId = '1'
            const spyGetTags = jest.spyOn(TagRepositoryMock, 'getTags')
            spyGetTags.mockImplementation(async (propietaryId)=>{
                const tag = {id:'1', propietaryId, name:'other'} as ITag
                return [tag]
            })
            const spyAdd = jest.spyOn(TagRepositoryMock, 'add')
            spyAdd.mockImplementation( async (propietaryId, name)=>{
                const tag = {id:'1', propietaryId, name} as ITag
                return tag
            })
            const validation = new Validation()
            const tagService:ITagUseCaseCreate = new TagService(TagRepositoryMock, validation)
            const tagName = 'test'

            const response = await tagService.create(userId, tagName)

            expect(response).not.toBeNull()
            expect(spyGetTags).toHaveBeenCalledTimes(1)
            expect(spyAdd).toHaveBeenCalledTimes(1)
            spyGetTags.mockRestore()
            spyAdd.mockRestore()
        })

    })

})
