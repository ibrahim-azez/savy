//            ------- BASES -------
// export { BaseRepository } from './bases/base.repository';

//            ------- DECORATORS -------
export { TryCatchController } from './decorators/method/try-catch-controller';
export { ValidateBody } from './decorators/method/validate-body';
export { ValidateParamsId } from './decorators/method/validate-params-id';

//            ------- ENTITIES -------
export { Order } from '../modules/order/order.entity';
export { Discount } from './entities/discount.entity';
export { Payment } from '../dump-modules/payment/payment.entity';
export { Session } from './entities/session.entity';

//            ------- MIDDLEWARE -------
export { ErrorHandlerMiddleware } from './middleware/error-handler.middleware';
export { isAdminMiddleware } from './middleware/is-admin.middleware';
export { isAuthMiddleware } from './middleware/is-auth-middleware';
export { loginMiddleware } from './middleware/login.middleware';

//            ------- MODELS -------
export { CrudService } from './models/crud-service.model';
export { HttpResponse } from './models/http-response.model';

//            ------- TYPES -------
export { Class } from './types/class.type';
export { ExtractStringKeys } from './types/extract-string-keys.type';

//            ------- UTILS -------
export { hashingPassword } from './utils/hashing-password';
export { IsOnlyDate } from './decorators/property-validators/is-only-date';
export { logger } from './utils/logger';
export { validator } from './utils/validator';
export { isPasswordValid } from './utils/is-password-valid';
export { arrayOfObjectsToInstance } from './utils/array-of-objects-to-instance';
export { myDataSource } from './utils/database';
