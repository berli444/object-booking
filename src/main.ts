import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
    rawBody: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  const logger = new Logger("Bootstrap");

  const config = new DocumentBuilder()
    .setTitle("Booking API")
    .setDescription("Booking API description")
    .setVersion("0.0.1")
    .addBearerAuth({
      description: `Please enter token in following format: Bearer <JWT>`,
      name: "Authorization",
      bearerFormat: "Bearer",
      scheme: "Bearer",
      type: "http",
      in: "Header",
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const PORT = app.get(ConfigService).get("port");

  await app.listen(PORT, () => {
    logger.log(`Server started on ${PORT}`);
  });
}
bootstrap();
