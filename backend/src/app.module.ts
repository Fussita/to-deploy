import { Module } from '@nestjs/common';
import { ClientController } from './controller/client.controller';
import { ProductController } from './controller/product.controller';
import { UserController } from './controller/user.controller';
import { OrderController, OrderImageController } from './controller/order.controller';
import { InvoiceController } from './controller/invoice.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseDataBaseProvider } from './mongoose';
import { AuthController } from './controller/auth.controller';
import { ReportsController } from './controller/reports.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret12345678',
      signOptions: { expiresIn: '168h' }
    }),
  ],
  controllers: [
    OrderImageController,
    ReportsController,
    ProductController,
    ClientController,
    UserController,
    OrderController,
    InvoiceController,
    AuthController
  ],
  providers: [
    MongooseDataBaseProvider
  ],
})
export class AppModule {}
