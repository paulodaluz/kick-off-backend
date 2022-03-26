import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3001;
  const host = process.env.HOST || '0.0.0.0';

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(String(process.env.APPLICATION_PREFIX));

  await app.listen(port, host, () => Logger.log(`Server running on port ${port}`));
}

bootstrap();
