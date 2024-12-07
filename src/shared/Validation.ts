import IValidations from "@interfaces/shared/IValidation"

export default class Validation implements IValidations
{

    checkUpperCase(text: string): boolean
    {
        try {
            return text.match(/[A-Z]/g)!=null
        } catch (error) {
            return false
        }
    }

    checkLowerCase(text: string): boolean
    {
        try {
            return text.match(/[a-z]/g)!=null
        } catch (error) {
            return false
        }
    }

    checkNumeric(text: string): boolean
    {
        try {
            return text.match(/[0-9]/g)!=null
        } catch (error) {
            return false
        }
    }

    checkAlphanumeric(text: string): boolean
    {
        try {
            const isAlphanumeric:boolean = text.toLowerCase().match(/^[-_ ñça-z0-9]+$/)!=null
            return isAlphanumeric
        } catch (error) {
            return false
        }
    }

    checkEmail(text: string): boolean
    {
        try {
            const isEmail:boolean = text.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)!=null
            return isEmail
        } catch (error) {
            return false
        }
    }

    checkPassword(text: string): boolean
    {
        try {
            if(text.length < 7) throw new Error('Password length should be >6')
            if(!this.checkLowerCase(text)) throw new Error('Password not contains lowercase letters')
            if(!this.checkUpperCase(text)) throw new Error('Password not contains uppercase letters')
            if(!this.checkNumeric(text)) throw new Error('Password not contains numbers')
            const isSpecialChar = new RegExp(/(?=.*[!@#$%^&*])/g)
            if(!text.match(isSpecialChar)) throw new Error('Password should be contain at least one special symbol')
            return true
        } catch (error) {
            return false
        }
    }

    checkURL(text: string): boolean
    {
        try {
            const newUrl:URL = new URL(text.trim())
            return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
        } catch (error) {
            return false
        }
    }
    
}
