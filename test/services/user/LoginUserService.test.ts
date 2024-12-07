import IUser from "../../../src/interfaces/user/IUser"
import { IUserUseCaseLogin } from "../../../src/interfaces/user/IUserUseCases"
import UserService from "../../../src/services/UserService"
import Validation from "../../../src/shared/Validation"
import Security from "../../../src/shared/Security"
import UserRepositoryMock from "../../mocks/UserRepositoryMock"

describe('Login User Service', ()=>{

    describe('login', ()=>{

        test('When the user is not found the result should be null', async ()=>{
            const spyFindByEmail = jest.spyOn(UserRepositoryMock, "findByEmail")
            spyFindByEmail.mockImplementation(async (email:string)=>{ return null })
            const validation = new Validation()
            const security = new Security()
            const userService:IUserUseCaseLogin = new UserService(UserRepositoryMock, validation, security)
            const emailField = "test@test.com"

            const user = await userService.login(emailField, "@testTEST1234")

            expect(user).toBeNull()
            expect(spyFindByEmail).toHaveBeenCalledWith(emailField)
            expect(spyFindByEmail).toHaveBeenCalledTimes(1)
            spyFindByEmail.mockRestore()
        })

        test('When the user is found but not contains password the result should be null', async ()=>{
            const spyFindByEmail = jest.spyOn(UserRepositoryMock, "findByEmail")
            spyFindByEmail.mockImplementation(async (email:string)=>{
                return { id:"1", email, isAdmin:false, createdAt:new Date(), updatedAt:new Date()} as IUser
            })
            const validation = new Validation()
            const security = new Security()
            const userService:IUserUseCaseLogin = new UserService(UserRepositoryMock, validation, security)
            const emailField = "test@test.com"

            const user = await userService.login(emailField, "@testTEST1234")

            expect(user).toBeNull()
            expect(spyFindByEmail).toHaveBeenCalledWith(emailField)
            expect(spyFindByEmail).toHaveBeenCalledTimes(1)
            spyFindByEmail.mockRestore()
        })

        test('When password are incorrect the result should be null', async ()=>{
            const spyFindByEmail = jest.spyOn(UserRepositoryMock, "findByEmail")
            spyFindByEmail.mockImplementation(async (email:string)=>{
                return { id:"1", email, password:"testTEST1234", isAdmin:false, createdAt:new Date(), updatedAt:new Date()} as IUser
            })
            const validation = new Validation()
            const security = new Security()
            const userService:IUserUseCaseLogin = new UserService(UserRepositoryMock, validation, security)
            const emailField = "test@test.com"

            const user = await userService.login(emailField, "@testTEST1234")

            expect(user).toBeNull()
            expect(spyFindByEmail).toHaveBeenCalledWith(emailField)
            expect(spyFindByEmail).toHaveBeenCalledTimes(1)
            spyFindByEmail.mockRestore()
        })

        test('When login is successfull should be return user object', async ()=>{
            const spyFindByEmail = jest.spyOn(UserRepositoryMock, "findByEmail")
            spyFindByEmail.mockImplementation(async (email:string)=>{
                return { 
                    id:"1", 
                    email, 
                    password:"$2a$14$Dq9gmFrXccnBORD69/m8puU/qlvQ54Z1saYxf48vo9R/wmGeWS1ia", 
                    isAdmin:false, 
                    createdAt:new Date(), 
                    updatedAt:new Date()
                } as IUser
            })
            const validation = new Validation()
            const security = new Security()
            const userService:IUserUseCaseLogin = new UserService(UserRepositoryMock, validation, security)
            const emailField = "test@test.com"

            const user = await userService.login(emailField, "@testTEST1234")

            expect(user).not.toBeNull()
            expect(user!.email).toBe(emailField)
            expect(spyFindByEmail).toHaveBeenCalledWith(emailField)
            expect(spyFindByEmail).toHaveBeenCalledTimes(1)
            spyFindByEmail.mockRestore()
        })

    })

})
