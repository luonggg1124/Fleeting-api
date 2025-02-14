export class InternalServerErrorException extends Error{
    constructor(message: string){
        super(message);
        this.name = "InternalServerErrorException";
    }
    public getStatus():number|string {
        return 500;
    }
}