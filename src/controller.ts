import { RouteInfo } from "./type"

export class FakeController {
    content: string = ''
    constructor(public name: string, public route: string) { }


    getContent() {
        return this.content
    }

    createMethod(methodName: string, routeInfo: RouteInfo) {

        this.content += `
    ${methodName}(${genParams(routeInfo.decorators)}){
return createRequest(
    {method:'${routeInfo.type.toLowerCase()}',
route:'/${this.route}/${routeInfo.route}',
args:arguments,
params:${JSON.stringify(routeInfo.decorators || [])}}
)
    }
    `

        return this
    }


    createClass() {
        this.content = `
export class ${this.name}{
${this.content}
}`
        return this
    }


    createImport() {
        this.content = `
import {createRequest} from 'nest2http'
`+ this.content
        return this
    }
}


function genParams(decorators: string[]) {

    return decorators.reduce((p, c) => {
        return p +  c+',' 
    }, '')
}