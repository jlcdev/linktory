export default class ControllerException extends Error
{

    private code:number
    
    constructor(code:number, message:string){
        super(message)
        this.code = code
    }

    getCode(){ return this.code }

    getJSON(){
        return {
            status:this.code,
            message:this.message
        }
    }

}
