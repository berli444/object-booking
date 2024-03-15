import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";

@Injectable()
export class CustomValidationPipe
  extends ValidationPipe
  implements PipeTransform<any>
{
  async transform(value: any, metadata: ArgumentMetadata) {
    return super.transform(value, metadata).catch((e) => {
      if (
        e.response &&
        e.response.message &&
        e.response.message instanceof Array
      ) {
        // Перевіряємо, чи помилка містить відповідь з повідомленнями валідації
        const validationErrors = e.response.message.filter(
          (msg) => msg instanceof Object,
        );
        const formattedErrors = this.formatErrors(validationErrors);
        throw new BadRequestException(formattedErrors);
      }
      throw e;
    });
  }

  private formatErrors(errors: any[]) {
    return errors.reduce((acc, err) => {
      // Форматування помилок валідації
      acc[err.property] = Object.values(err.constraints);
      return acc;
    }, {});
  }
}
