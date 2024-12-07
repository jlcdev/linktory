import ITag from "../../../src/interfaces/tag/ITag"
import { ITagUseCaseDelete } from "../../../src/interfaces/tag/ITagUseCases"
import TagService from "../../../src/services/TagService"
import Validation from "../../../src/shared/Validation"
import TagRepositoryMock from "../../mocks/TagRepositoryMock"

describe('Delete Tag Service', ()=>{
    
    describe('delete', ()=>{
        
        test('When the tag to be removed does not exist the result should be true', async ()=>{
            const userId = '1'
            const spyGetTagById = jest.spyOn(TagRepositoryMock, 'getTagById')
            spyGetTagById.mockImplementation(async (_0, _1)=>{ return null }) // Tag not found
            const spyDelete = jest.spyOn(TagRepositoryMock, 'delete')
            const validation = new Validation()
            const tagService:ITagUseCaseDelete = new TagService(TagRepositoryMock, validation)
            
            const response = await tagService.delete(userId, '1')

            expect(response).toBe(true)
            expect(spyGetTagById).toHaveBeenCalledTimes(1)
            expect(spyDelete).not.toHaveBeenCalled()
            spyGetTagById.mockRestore()
            spyDelete.mockRestore()
        })

        test('When link tags can not be removed the result should be false', async ()=>{
            const userId = '1'
            const spyGetTagById = jest.spyOn(TagRepositoryMock, 'getTagById')
            spyGetTagById.mockImplementation(async (propietaryId, tagId)=>{
                const tag = {id:tagId, propietaryId, name:'other'} as ITag
                return tag
            })
            const spyDeleteAllTagsOnLink = jest.spyOn(TagRepositoryMock, 'deleteAllTagsOnLink')
            spyDeleteAllTagsOnLink.mockImplementation(async ()=>{ return false})
            const spyDelete = jest.spyOn(TagRepositoryMock, 'delete')
            const validation = new Validation()
            const tagService:ITagUseCaseDelete = new TagService(TagRepositoryMock, validation)
            
            const response = await tagService.delete(userId, '1')

            expect(response).toBe(false)
            expect(spyGetTagById).toHaveBeenCalledTimes(1)
            expect(spyDeleteAllTagsOnLink).toHaveBeenCalledTimes(1)
            expect(spyDelete).not.toHaveBeenCalled()
            spyGetTagById.mockRestore()
            spyDeleteAllTagsOnLink.mockRestore()
            spyDelete.mockRestore()
        })

        test('When the tag to be deleted is in the database and the operation is not successful, the result should be false', async ()=>{
            const userId = '1'
            const spyGetTagById = jest.spyOn(TagRepositoryMock, 'getTagById')
            spyGetTagById.mockImplementation(async (propietaryId, tagId)=>{
                const tag = {id:tagId, propietaryId, name:'other'} as ITag
                return tag
            })
            const spyDeleteAllTagsOnLink = jest.spyOn(TagRepositoryMock, 'deleteAllTagsOnLink')
            spyDeleteAllTagsOnLink.mockImplementation(async ()=>{ return true})
            const spyDelete = jest.spyOn(TagRepositoryMock, 'delete')
            spyDelete.mockImplementation(async (_propietaryId, _tag)=>{
                return false
            })
            const validation = new Validation()
            const tagService:ITagUseCaseDelete = new TagService(TagRepositoryMock, validation)

            const response = await tagService.delete(userId, '1')

            expect(response).toBe(false)
            expect(spyGetTagById).toHaveBeenCalledTimes(1)
            expect(spyDeleteAllTagsOnLink).toHaveBeenCalledTimes(1)
            expect(spyDelete).toHaveBeenCalledTimes(1)
            spyGetTagById.mockRestore()
            spyDeleteAllTagsOnLink.mockRestore()
            spyDelete.mockRestore()
        })

        test('When the tag to be deleted is in the database and the operation is carried out successfully, the result should be true', async ()=>{
            const userId = '1'
            const spyGetTagById = jest.spyOn(TagRepositoryMock, 'getTagById')
            spyGetTagById.mockImplementation(async (propietaryId, tagId)=>{
                const tag = {id:tagId, propietaryId, name:'other'} as ITag
                return tag
            })
            const spyDeleteAllTagsOnLink = jest.spyOn(TagRepositoryMock, 'deleteAllTagsOnLink')
            spyDeleteAllTagsOnLink.mockImplementation(async ()=>{ return true})
            const spyDelete = jest.spyOn(TagRepositoryMock, 'delete')
            spyDelete.mockImplementation(async (_propietaryId, _tag)=>{
                return true
            })
            const validation = new Validation()
            const tagService:ITagUseCaseDelete = new TagService(TagRepositoryMock, validation)
            
            const response = await tagService.delete(userId, '1')

            expect(response).toBe(true)
            expect(spyGetTagById).toHaveBeenCalledTimes(1)
            expect(spyDeleteAllTagsOnLink).toHaveBeenCalledTimes(1)
            expect(spyDelete).toHaveBeenCalledTimes(1)
            spyGetTagById.mockRestore()
            spyDeleteAllTagsOnLink.mockRestore()
            spyDelete.mockRestore()
        })

    })

})
