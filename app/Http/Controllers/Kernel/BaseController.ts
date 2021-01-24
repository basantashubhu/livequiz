import {Singleton} from './Singleton'

export class BaseController extends Singleton{
    rules : string[]

    constructor() {
        super()
        this.rules = []
    }

    middleware(...middlewares : string[]) {
        middlewares.forEach(rule => this.rules.push(rule))
    }

    resolve(method : string) : Function {
        return (this as any)[method]
    }
}