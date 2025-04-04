import * as process from "process";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "./pipes/validation.pipe";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Бэкенд по первому приложению на NEST')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('Zerro-tag')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)

    app.useGlobalPipes(new ValidationPipe())

    app.enableCors({
        origin: 'http://localhost:5173',
        methods: 'GET,POST,PUT,DELETE,PATCH',
        credentials: true
    })

    await app.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
}

start()