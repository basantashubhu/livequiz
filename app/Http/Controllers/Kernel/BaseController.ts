export class BaseController {
    private static instance : any
    rules : string[]

    constructor() {
        this.rules = []
    }

    static getInstance() : any {
        if(!this.instance) {
            this.instance = new this()
        }
        return this.instance
    }

    middleware(...middlewares : string[]) {
        middlewares.forEach(rule => this.rules.push(rule))
    }

    resolve(method : string) : Function {
        return (this as any)[method]
    }
}