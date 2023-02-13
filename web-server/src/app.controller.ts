import { Controller, Get } from '@nestjs/common';

@Controller('/hello')
export class AppController {
    @Get('/')
    async root (): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('hi there')
            }, 200)
        });
    }
}