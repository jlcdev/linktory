import ILinkRepository from "../../src/interfaces/link/ILinkRepository"

const LinkRepositoryMock = {
    findByPropietary: jest.fn(),
    findById: jest.fn(),
    add: jest.fn(),
    delete: jest.fn(),
    addTagOnLink: jest.fn(),
    deleteTagOnLink: jest.fn(),
    deleteAllTagsOnLink: jest.fn()
} as ILinkRepository

export default LinkRepositoryMock