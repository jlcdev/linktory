import IUser from "@interfaces/user/IUser"
import {
    IUserUseCaseGetById,
    IUserUseCaseGetByEmail,
    IUserUseCaseLogin,
    IUserUseCaseRegister
} from "@interfaces/user/IUserUseCases"
import IUserRepository from "@interfaces/user/IUserRepository"
import IValidation from "@interfaces/shared/IValidation"
import ISecurity from "@interfaces/shared/ISecurity"
import UseCaseException from "@exceptions/UseCaseException"

export default class UserService implements IUserUseCaseLogin, IUserUseCaseRegister, IUserUseCaseGetByEmail, IUserUseCaseGetById
{

    private salt:string|null = null

    constructor(
        private readonly userRepository:IUserRepository,
        private readonly validation:IValidation,
        private readonly security:ISecurity
    ){}

    async login(email: string, password: string): Promise<IUser|null>
    {
        try {
            // Validations
            if(!this.validation.checkEmail(email)) throw new UseCaseException('Incorrect email field')
            if(!this.validation.checkPassword(password)) throw new UseCaseException('Incorrect password field')
            
            const userAccount = await this.userRepository.findByEmail(email)
            if(userAccount == null) throw new UseCaseException('Account not found')
            if(userAccount.password == undefined) throw new UseCaseException('Account password not found')
            
            const comparationResult = await this.security.compareHash(password, userAccount.password)
            if(!comparationResult) throw new UseCaseException('Incorrect password for account')
            
            return userAccount
        } catch (error) {
            return null
        }
    }

    async register(email: string, password: string): Promise<IUser|null>
    {
        try {
            // Validations
            if(!this.validation.checkEmail(email)) throw new UseCaseException('Incorrect email')
            if(!this.validation.checkPassword(password)) throw new UseCaseException('Password does not meet requirements')
            const account:IUser|null = await this.userRepository.findByEmail(email)
            if(account != null) throw new UseCaseException('Cannot create account with that email')
            if(this.salt == null) this.salt = await this.security.generateSalt(12)
            const hashedPassword:string = await this.security.createHash(password, this.salt)
            const newAccount:IUser|null = await this.userRepository.create(email, hashedPassword, false)
            return newAccount
        } catch (error) {
            return null
        }
    }

    async getById(userId:string):Promise<IUser|null>
    {
        try {
            return await this.userRepository.findById(userId)
        } catch (error) {
            return null
        }
    }

    async getByEmail(email: string): Promise<IUser|null>
    {
        try {
            if(!this.validation.checkEmail(email)) throw new UseCaseException('Incorrect email')
            return await this.userRepository.findByEmail(email)
        } catch (error) {
            return null
        }
    }

}
