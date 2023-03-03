//@ts-nocheck
import  ts from 'typescript'
import { RouteInfo } from './type'
export function transform(source:string){
    const data: {
        route: string,
        name:string,
        routeMap: Map<string, RouteInfo>
      } = { routeMap: new Map(), route: '' }
      
      ts.transpileModule(source, {
        transformers: { before: [createTransformer()] }
      })
      
      
      
      function createTransformer() {
        return context => {
          return node => ts.visitNode(node, visit)
      
          function visit(node) {

            // 如果发现字符串，替换为自己的内容
            if (ts.isDecorator(node)) {

              if (node.expression?.expression?.escapedText === 'Controller') {
                data.route = node.expression?.arguments?.[0]?.text || ''
                data.name=node.parent.symbol.escapedName
              }
      
      
              if (['Get', 'Put', 'Delete', 'Post'].includes(node.expression?.expression?.escapedText)) {
                data.routeMap.set(node.parent.name?.escapedText, { type: node.expression?.expression?.escapedText, route: node.expression?.arguments?.[0]?.text, decorators: [] })
              }
              if (['Body', 'Query','Param'].includes(node.expression?.expression?.escapedText)) {
                const methodInfo = data.routeMap.get(node.parent?.parent.name?.escapedText)
                methodInfo?.decorators.push(`${node.expression?.expression?.escapedText}_${node.expression?.arguments?.[0]?.text||''}`)
      
      
              }
            }//parent.name?.escapedText
            return ts.visitEachChild(node, visit, context)
      
      
          }
        }
      }
      return data
}