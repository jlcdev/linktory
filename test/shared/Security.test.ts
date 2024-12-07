import ISecurity from "../../src/interfaces/shared/ISecurity"
import Security from "../../src/shared/Security"

describe('Security utilities', ()=>{

    describe('createJWT', ()=>{

        test('When a jwt token is needed it should be created', ()=>{
            const security:ISecurity = new Security()
            const token:string = security.createJWT('1', 'testTEST1234', { expiresIn:'7d' })

            expect(token).not.toBeNull()
            expect(token.length).toBeGreaterThan(5)
            expect(token.split('.').length).toBe(3)
        })

    })

    describe('generateSalt', ()=>{

        test('When a number of rounds is provided a encryption seed should be generated', async ()=>{
            const security:ISecurity = new Security()
            const salt:string = await security.generateSalt(2)

            expect(salt).not.toBeNull()
            expect(salt.length).toBeGreaterThan(5)
        })

    })

    describe('createHash', ()=>{

        test('When a password is protected the result should not be the same',async ()=>{
            const security:ISecurity = new Security()
            const plainPassword:string = 'testTEST1234'
            const salt:string = await security.generateSalt(2)

            const hashed:string = await security.createHash(plainPassword, salt)

            expect(hashed).not.toBeNull()
            expect(hashed.length).toBeGreaterThan(5)
            expect(hashed).not.toBe(plainPassword)
        })

    })

    describe('compareHash', ()=>{

        test('When passwords differ the result should be negative', async ()=>{
            const security:ISecurity = new Security()
            const plainPassword:string = 'testTEST1234'
            
            const result = await security.compareHash(plainPassword, plainPassword)

            expect(result).not.toBeNull()
            expect(result).toBe(false)
        })

        test('When the passwords match the result should be true', async ()=>{
            const security:ISecurity = new Security()
            const plainPassword:string = 'testTEST1234'
            const hashedPassword:string = '$2b$14$xlolnlPN85cjbYZt4AXoIOhkrHB4H0HEpxuZAtu/6cxYlmEZrCTWi'
            const result = await security.compareHash(plainPassword, hashedPassword)

            expect(result).not.toBeNull()
            expect(result).toBe(true)
        })

    })

})
