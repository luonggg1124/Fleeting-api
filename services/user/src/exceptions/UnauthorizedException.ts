export class UnauthorizedException extends Error{
    constructor(message: string){
        super(message);
        this.name = "UnauthorizedException";
    }
    public getStatus():number|string {
        return 401;
    }
}