import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import config from "./config";
import { DatabaseModule } from "./database/database.module";
import { BookingObjectModule } from "./booking-object/booking-object.module";
import { BookingModule } from "./booking/booking.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
    BookingObjectModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
