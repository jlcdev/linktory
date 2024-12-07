
import IUser from "../../../src/interfaces/user/IUser"
import { IUserUseCaseGetById } from "../../../src/interfaces/user/IUserUseCases"
import UserService from "../../../src/services/UserService"
import ISecurity from "../../../src/interfaces/shared/ISecurity"
import Security from "../../../src/shared/Security"
import IValidation from "../../../src/interfaces/shared/IValidation"
import Validation from "../../../src/shared/Validation"
import UserRepositoryMock from "../../mocks/UserRepositoryMock"

describe('Get by id User Service', ()=>{

    describe('getById', ()=>{

        test('When searching for a user by id that exists the result should be the user information', async ()=>{
            const spyFindUserById = jest.spyOn(UserRepositoryMock, "findById")
            spyFindUserById.mockImplementation(async (userId:string)=>{
                return { id:userId, email:'test@test.com', isAdmin:false, createdAt:new Date(), updatedAt:new Date()} as IUser
            })
            const validation:IValidation = new Validation()
            const security:ISecurity = new Security()
            const userService:IUserUseCaseGetById = new UserService(UserRepositoryMock, validation, security)

            const response = await userService.getById('1')

            expect(response).not.toBeNull()
            expect(response!.id).toBe('1')
            spyFindUserById.mockRestore()
        })

    })

})
