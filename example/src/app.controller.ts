import { Controller, Post, Body, Query, Param } from '@nestjs/common';

@Controller('foo')
export class AppController {
    constructor() { }

    @Post(':id')
   async helloFoo(@Body() body: { name: string }, @Query('command') cmd: string, @Param('id') param: string) {
    return {body,cmd,param}
    }

}