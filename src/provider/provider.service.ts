import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ProviderService {
  providers = [
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
  services = [
    {
      id: 1,
      serviceName: 'Healthcare',
      providerName: 'Jenkins Inc',
      price: 450.75,
    },
    {
      id: 2,
      serviceName: 'Data Analysis',
      providerName: 'Kuhic Group',
      price: 2540.0,
    },
    {
      id: 3,
      serviceName: 'IT Consulting',
      providerName: 'Jenkins Inc',
      price: 1025.15,
    },
    {
      id: 4,
      serviceName: 'Healthcare',
      providerName: 'Kuhic Group',
      price: 99.99,
    },
    {
      id: 5,
      serviceName: 'Web Development',
      providerName: 'Satterfield - Blanda',
      price: 3800.5,
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
  createService(createServiceDto: CreateServiceDto) {
    const servicesByHighestId = [...this.services].sort((a, b) => b.id - a.id);
    const newService = {
      id: servicesByHighestId[0].id + 1,
      ...createServiceDto,
    };
    this.services.push(newService);
    return newService;
  }
  findAllServices(
    serviceName?:
      | 'Healthcare'
      | 'Data Analysis'
      | 'IT Consulting'
      | 'Web Development',
  ) {
    // If a query is provided, filter by it
    if (serviceName) {
      const filtered = this.services.filter(
        (service) => service.serviceName === serviceName,
      );

      if (filtered.length === 0) {
        throw new NotFoundException(
          `No service provider found for ${serviceName}`,
        );
      }

      return filtered;
    }

    // Otherwise return all
    return this.services;
  }
}
