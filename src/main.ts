import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Zeblog Backend API')
    .setDescription('The Zeblog API description')
    .setVersion('1.0')
    .addTag('zeblog')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  const port = parseInt(process.env.PORT || '3000', 10);
  const host = '0.0.0.0';

  await app.listen(port, host);
  console.log(`Application is running on: ${host}:${port}`);
}
bootstrap();
