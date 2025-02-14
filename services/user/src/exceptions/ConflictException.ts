export class ConflictException extends Error{
    constructor(message: string){
        super(message);
        this.name = "ConflictException";
    }
    public getStatus():number|string {
        return 400;
    }
}