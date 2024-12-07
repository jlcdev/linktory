import IUser from "../../../src/interfaces/user/IUser"
import { IUserUseCaseGetByEmail } from "../../../src/interfaces/user/IUserUseCases"
import UserService from "../../../src/services/UserService"
import ISecurity from "../../../src/interfaces/shared/ISecurity"
import Security from "../../../src/shared/Security"
import IValidation from "../../../src/interfaces/shared/IValidation"
import Validation from "../../../src/shared/Validation"
import UserRepositoryMock from "../../mocks/UserRepositoryMock"

describe('Get by email User Service', ()=>{

    describe('getByEmail', ()=>{

        test('When searching for a malformed email the result should be null', async ()=>{
            const spyFindByEmail = jest.spyOn(UserRepositoryMock, "findByEmail")
            spyFindByEmail.mockImplementation(async (email:string)=>{
                return { id:"1", email, isAdmin:false, createdAt:new Date(), updatedAt:new Date()} as IUser
            })
            const validation:IValidation = new Validation()
            const security:ISecurity = new Security()
            const userService:IUserUseCaseGetByEmail = new UserService(UserRepositoryMock, validation, security)
            const emailField = "testtest.com"

            const response = await userService.getByEmail(emailField)

            expect(response).toBeNull()
            expect(spyFindByEmail).not.toHaveBeenCalled()
            spyFindByEmail.mockRestore()
        })

        test('When searching for a user by email that exists the result should be the user information', async ()=>{
            const spyFindByEmail = jest.spyOn(UserRepositoryMock, "findByEmail")
            spyFindByEmail.mockImplementation(async (email:string)=>{
                return { id:"1", email, isAdmin:false, createdAt:new Date(), updatedAt:new Date()} as IUser
            })
            const validation:IValidation = new Validation()
            const security:ISecurity = new Security()
            const userService:IUserUseCaseGetByEmail = new UserService(UserRepositoryMock, validation, security)
            const emailField = "test@test.com"

            const response = await userService.getByEmail(emailField)

            expect(response).not.toBeNull()
            expect(spyFindByEmail).toHaveBeenCalledWith(emailField)
            expect(spyFindByEmail).toHaveBeenCalledTimes(1)
            spyFindByEmail.mockRestore()
        })

    })

})
