export class ForbiddenException extends Error{
    constructor(message: string){
        super(message);
        this.name = "ForbiddenException";
    }
    public getStatus():number|string {
        return 403;
    }
}