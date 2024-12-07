export default interface IValidation
{
    checkUpperCase(text:string):boolean
    checkLowerCase(text:string):boolean
    checkNumeric(text:string):boolean
    checkAlphanumeric(text:string):boolean
    checkEmail(text:string):boolean
    checkPassword(text:string):boolean
    checkURL(text:string):boolean
}