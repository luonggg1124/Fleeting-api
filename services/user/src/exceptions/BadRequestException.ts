export class BadRequestException extends Error{
    constructor(message: string){
        super(message);
        this.name = "BadRequestException";
    }
    public getStatus():number|string {
        return 400;
    }
}