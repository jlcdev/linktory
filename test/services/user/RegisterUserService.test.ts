import IUser from "../../../src/interfaces/user/IUser"
import UserRepositoryMock from "../../mocks/UserRepositoryMock"
import { IUserUseCaseRegister } from "../../../src/interfaces/user/IUserUseCases"
import UserService from "../../../src/services/UserService"
import Validation from "../../../src/shared/Validation"
import Security from "../../../src/shared/Security"

describe('Register User Service', ()=>{

    describe('register', ()=>{

        test('When user exist result should be null', async ()=>{
            const spyFindByEmail = jest.spyOn(UserRepositoryMock, "findByEmail")
            const spyCreate = jest.spyOn(UserRepositoryMock, "create")
            spyFindByEmail.mockImplementation(async (email:string)=>{
                return { id:"1", email, isAdmin:false, createdAt:new Date(), updatedAt:new Date()} as IUser
            })
            const validation = new Validation()
            const security = new Security()
            const userService:IUserUseCaseRegister = new UserService(UserRepositoryMock, validation, security)
            const emailField = "test@test.com"
            
            const user = await userService.register(emailField, "testTEST1234@")

            expect(user).toBeNull()
            expect(spyFindByEmail).toHaveBeenCalledWith(emailField)
            expect(spyFindByEmail).toHaveBeenCalledTimes(1)
            expect(spyCreate).toHaveBeenCalledTimes(0)
            spyFindByEmail.mockRestore()
            spyCreate.mockRestore()
        })

        test('When the user does not exist then it should be created', async ()=>{
            const spyFindByEmail = jest.spyOn(UserRepositoryMock, "findByEmail")
            spyFindByEmail.mockImplementation(async (email:string)=> null)
            const spyCreate = jest.spyOn(UserRepositoryMock, "create")
            spyCreate.mockImplementation(async (email:string, password:string, isAdmin:boolean)=>{
                return { id:"1", email, password, isAdmin, createdAt:new Date(), updatedAt:new Date()} as IUser
            })
            const validation = new Validation()
            const security = new Security()
            const userService:IUserUseCaseRegister = new UserService(UserRepositoryMock, validation, security)
            const emailField = "test@test.com"
            const passwordField = "testTEST1234@"
            
            const user = await userService.register(emailField, passwordField)

            expect(user).not.toBeNull()
            expect(spyFindByEmail).toHaveBeenCalledWith(emailField)
            expect(spyFindByEmail).toHaveBeenCalledTimes(1)
            expect(spyCreate).toHaveBeenCalledTimes(1)
            expect(user!.password).not.toBe(passwordField)
            spyFindByEmail.mockRestore()
            spyCreate.mockRestore()
        })

    })

})
