import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';

@Injectable()
export class ProviderService {
  private providers = [
    {
      id: 1,
      name: 'Mrs. Evelyn Ryan',
      email: 'Evelyn_Ryan@yahoo.com',
      serviceType: 'IT Consulting',
    },
    {
      id: 2,
      name: 'Ramon Schimmel',
      email: 'Ramon_Schimmel99@hotmail.com',
      serviceType: 'Marketing Agency',
    },
    {
      id: 3,
      name: 'Ms. Marlee Mann',
      email: 'Marlee_Mann87@gmail.com',
      serviceType: 'Healthcare',
    },
  ];

  registerProvider(createProviderDto: CreateProviderDto) {
    const providersByHighestId = [...this.providers].sort(
      (a, b) => b.id - a.id,
    );
    const newProvider = {
      id: providersByHighestId[0].id + 1,
      ...createProviderDto,
    };
    this.providers.push(newProvider);
    return newProvider;
  }
}
