import ITagRepository from "../../src/interfaces/tag/ITagRepository"

const TagRepositoryMock = {
    getTags: jest.fn(),
    getTagById: jest.fn(),
    add: jest.fn(),
    delete: jest.fn(),
    deleteAllTagsOnLink:jest.fn()
} as ITagRepository

export default TagRepositoryMock