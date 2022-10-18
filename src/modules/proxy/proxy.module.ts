import { HttpModule } from '@nestjs/axios';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CONFIG_FILE_PATH } from 'src/utils/environment/constants';
import { EnvConfigModule } from 'src/utils/environment/env.config.module';
import { ProxyInjectionToken } from './application/proxy-injection.token';
import { ShowDomainAvailabilityHandler } from './application/query';
import { ProxyController } from './infractructure/adapter/in/rest/proxy.controller';
import { BushidoProxyServiceImplement } from './infractructure/adapter/out/services/bushido-proxy.service';

const infrastructure: Provider[] = [
  {
    provide: ProxyInjectionToken.BUSHIDO_PROXY_SERVICE,
    useClass: BushidoProxyServiceImplement,
  },
];

const EventHandlers = [ShowDomainAvailabilityHandler];

@Module({
  imports: [
    CqrsModule,
    HttpModule,
    EnvConfigModule.register({
      folder: CONFIG_FILE_PATH,
    }),
  ],
  controllers: [ProxyController],
  providers: [...infrastructure, ...EventHandlers],
  exports: [ProxyInjectionToken.BUSHIDO_PROXY_SERVICE],
})
export class ProxyModule {}
