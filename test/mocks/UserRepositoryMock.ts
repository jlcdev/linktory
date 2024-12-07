import IUserRepository from "../../src/interfaces/user/IUserRepository"

const UserRepositoryMock = {
    findById:jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn()
} as IUserRepository

export default UserRepositoryMock