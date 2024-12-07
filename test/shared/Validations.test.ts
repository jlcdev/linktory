import Validation from "../../src/shared/Validation"

describe('Global validation functions', ()=>{

    describe('checkUpperCase', ()=>{

        test('When a text is entered it should respond true if it contains at least one uppercase letter', ()=>{
            const validation = new Validation()
            expect(validation.checkUpperCase("Testing text")).toBe(true)
            expect(validation.checkUpperCase("TESTING TEXT")).toBe(true)
        })

        test('When a text is entered it should respond true if not contains at least one uppercase letter', ()=>{
            const validation = new Validation()
            expect(validation.checkUpperCase("testing text 123")).toBe(false)
            expect(validation.checkUpperCase("123456")).toBe(false)
            expect(validation.checkUpperCase(" ")).toBe(false)
        })

    })

    describe('checkLowerCase', ()=>{

        test('When a text is entered it should respond true if it contains at least one lowercase letter', ()=>{
            const validation = new Validation()
            expect(validation.checkLowerCase("testing text")).toBe(true)
            expect(validation.checkLowerCase("TESTING TeXT")).toBe(true)
        })

        test('When a text is entered it should respond false if not contains at least one lowercase letter', ()=>{
            const validation = new Validation()
            expect(validation.checkLowerCase("TESTING TEXT")).toBe(false)
            expect(validation.checkLowerCase("TESTING TEXT 123")).toBe(false)
            expect(validation.checkLowerCase("123")).toBe(false)
            expect(validation.checkLowerCase(" ")).toBe(false)
        })

    })

    describe('checkNumeric', ()=>{

        test('When a text is entered it should respond true if it contains at least one number', ()=>{
            const validation = new Validation()
            expect(validation.checkNumeric("123")).toBe(true)
            expect(validation.checkNumeric("TESTING TEXT 123")).toBe(true)
            
        })

        test('When a text is entered it should respond false if not contains at least one number', ()=>{
            const validation = new Validation()
            expect(validation.checkNumeric("testing text")).toBe(false)
            expect(validation.checkNumeric("TESTING TeXT")).toBe(false)
            expect(validation.checkNumeric("TESTING TEXT")).toBe(false)
            expect(validation.checkNumeric(" ")).toBe(false)
        })

    })

    describe('checkEmail', ()=>{

        test('When email are introduced the response should be true', ()=>{
            const validation = new Validation()
            expect(validation.checkEmail("test@test.com")).toBe(true)
        })

        test('When a email is malformed the response should be false', ()=>{
            const validation = new Validation()
            expect(validation.checkEmail("test@@.com")).toBe(false)
            expect(validation.checkEmail("test@test.c")).toBe(false)
            expect(validation.checkEmail("test.com")).toBe(false)
            expect(validation.checkEmail(".com")).toBe(false)
            expect(validation.checkEmail("@test.com")).toBe(false)
        })

    })

    describe('checkPassword', ()=>{

        test('When the password is short the result should be false', ()=>{
            const validation = new Validation()
            expect(validation.checkPassword('')).toBe(false)
            expect(validation.checkPassword(' ')).toBe(false)
            expect(validation.checkPassword('tE1#')).toBe(false)
        })

        test('When the password does not contain lowercase characters the result must be false', ()=>{
            const validation = new Validation()
            expect(validation.checkPassword('TEST1234@#')).toBe(false)
        })

        test('When the password does not contain uppercase characters the result must be false', ()=>{
            const validation = new Validation()
            expect(validation.checkPassword('test1234@#')).toBe(false)
        })

        test('When the password does not contain numbers the result must be false', ()=>{
            const validation = new Validation()
            expect(validation.checkPassword('testTEST@#')).toBe(false)
        })

        test('When the password does not contain any allowed symbols the result must be false', ()=>{
            const validation = new Validation()
            expect(validation.checkPassword('testTEST1234')).toBe(false)
        })

        test('When the password meets all security requirements the result should be true', ()=>{
            const validation = new Validation()
            expect(validation.checkPassword('testTEST1234@#')).toBe(true)
        })

    })

    describe('checkAlphanumeric', () => {

        test('When the text only contains lowercase letters the result should be true', ()=>{
            const validation = new Validation()
            expect(validation.checkAlphanumeric('test')).toBe(true)
        })

        test('When the text only contains uppercase letters the result should be true', ()=>{
            const validation = new Validation()
            expect(validation.checkAlphanumeric('TEST')).toBe(true)
        })

        test('When the text only contains numbers the result should be true', ()=>{
            const validation = new Validation()
            expect(validation.checkAlphanumeric('1')).toBe(true)
            expect(validation.checkAlphanumeric('1234')).toBe(true)
        })

        test('When the text only contains letters and numbers the result should be true', ()=>{
            const validation = new Validation()
            expect(validation.checkAlphanumeric('test1234')).toBe(true)
            expect(validation.checkAlphanumeric('test1234TEXT')).toBe(true)
            expect(validation.checkAlphanumeric('test1234')).toBe(true)
        })

        test('When the text contains at least one symbol the result should be false', ()=>{
            const validation = new Validation()
            expect(validation.checkAlphanumeric('test@Test.com')).toBe(false)
            expect(validation.checkAlphanumeric('test.com')).toBe(false)
            expect(validation.checkAlphanumeric('#')).toBe(false)
        })

    })

    describe('checkURL', ()=>{

        test('When the url is incorrect the result should be false', ()=>{
            const validation = new Validation()
            expect(validation.checkURL('test')).toBe(false)
            expect(validation.checkURL('.com')).toBe(false)
            expect(validation.checkURL('test.')).toBe(false)
            expect(validation.checkURL('test.com')).toBe(false)
        })

        test('When the url is correct the result should be true', ()=>{
            const validation = new Validation()
            expect(validation.checkURL('http://localhost:3000/')).toBe(true)
            expect(validation.checkURL('https://localhost:3000/')).toBe(true)
            expect(validation.checkURL('https://www.test.com')).toBe(true)
            expect(validation.checkURL('https://www.test.com/test/1234-vvdr342-/test')).toBe(true)
        })

    })
    
})
