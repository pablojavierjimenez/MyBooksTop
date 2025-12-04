import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <!DOCTYPE html>
    <head>
      <title>My Book Top - API!</title>
    </head>
    <body style="background-color: darkgoldenrod; text-align: center;">
    <h1 style="color: white;">My Book Top - API !</h1>
    <h2><a href="/docs">Swagger api documentation</a></h2>
    </body>
    </html>`;
  }
}
