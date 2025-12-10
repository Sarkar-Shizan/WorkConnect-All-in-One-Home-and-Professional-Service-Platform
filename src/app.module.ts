import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { AdminModule } from './admin/admin.module';
import { WorkerModule } from './worker/worker.module';
import { ServiceProviderModule } from './service-provider/service-provider.module'; // ADD THIS

@Module({
  imports: [
    CustomerModule,
    AdminModule,
    WorkerModule,
    ServiceProviderModule, // ADD THIS LINE
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'WorkConnect',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
