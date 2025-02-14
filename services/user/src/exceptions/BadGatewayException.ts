export class BadGatewayException extends Error{
    constructor(message: string){
        super(message);
        this.name = "BadGatewayException";
    }
    public getStatus():number|string {
        return 502;
    }
}