export class NotFoundException extends Error{
    constructor(message: string){
        super(message);
        this.name = "NotFoundException";
    }
    public getStatus():number|string {
        return 404;
    }
}