import { createUnplugin } from 'unplugin'
import { FakeController } from './controller'
import { transform } from './transform'
export const unplugin = createUnplugin(() => {
    return {
        name: 'unplugin-controller-transform',
        enforce:'pre',

        transformInclude(id) {
            return id.endsWith('.controller.ts')
        },
        // just like rollup transform
        transform(code) {
            const ret = transform(code)
            const controller = new FakeController(ret.name, ret.route)
            for (let i of ret.routeMap) {
                controller.createMethod(i[0], i[1])
            }
            return controller.createClass().createImport().getContent()
        },
        // more hooks coming
    }
})
