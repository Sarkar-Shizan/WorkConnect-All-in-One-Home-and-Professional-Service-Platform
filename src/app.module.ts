import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { AdminModule } from './admin/admin.module';
import { WorkerModule } from './worker/worker.module';
import { ProviderModule } from './provider/provider.module';

@Module({
  imports: [CustomerModule, AdminModule, WorkerModule, ProviderModule],
  controllers: [],
  providers:[],
})
export class AppModule {}
