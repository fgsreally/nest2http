import { FakeController } from "../src/controller";
import { transform } from '../src/transform'
import { createRequest } from "../src/core";
import { describe, expect, it } from 'vitest'
const str = `
import { Controller, Get } from '@nestjs/common';

@Controller('foo')
export class NoVersioningController {
  @Get('/:id')
  helloFoo(@Body()  body:any,@Query('command') cmd:any,@Param('id') param:string) {
    return 'Hello FooBar!';
  }
  
}`

describe('nest2http', () => {
    it('transform nest controller to fake controller', () => {
        const ret = transform(str)
        expect(ret.name).toBe('NoVersioningController')
        expect(ret.route).toBe('foo')
        const controller = new FakeController(ret.name, ret.route)
        for (let i of ret.routeMap) {
            controller.createMethod(i[0], i[1])
        }
        const content = controller.createClass().createImport().getContent()
        expect(content).toMatchSnapshot()
    })

    it('createRequest', () => {
        class fakeClass {

            helloFoo(Body_: any, Query_command: any, Param_id: any,) {
                return createRequest(
                    {
                        method: 'get',
                        route: '/foo/:id',
                        args: arguments,
                        params: ["Body_", "Query_command", "Param_id"]
                    } as any
                )
            }

        }
        const { helloFoo } = new fakeClass()
        expect(helloFoo({ name: 'nest2http' }, 'cmd', 'param')).toMatchSnapshot()
    })
})