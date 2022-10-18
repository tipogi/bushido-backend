import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ShowMarketOffersInput } from '../../../../../market/infrastructure/adapters/in/graphql/input';
import { MarketObject } from '../../../../../market/infrastructure/adapters/in/graphql/models';
import { map } from 'rxjs/operators';
import { BushidoProxyService } from '../../../ports/bushido-proxy.service';
import { IDomainData } from 'src/modules/proxy/application/query';
import { EnvConfigService } from 'src/utils/environment/env.config.service';
import { PROXY_HOST, PROXY_PORT } from 'src/utils/environment/constants';

@Injectable()
export class BushidoProxyServiceImplement implements BushidoProxyService {
  constructor(private readonly httpService: HttpService, private readonly configService: EnvConfigService) {}

  async requestOffers(params: ShowMarketOffersInput | IDomainData, path: string): Promise<MarketObject> {
    const HOST = `${this.configService.get(PROXY_HOST)}:${this.configService.get(PROXY_PORT)}`;
    return await firstValueFrom(
      this.httpService.post(`http://${HOST}/${path}`, params).pipe(map((response) => response.data)),
    );
  }

  async requestDomainState(params: IDomainData, path: string): Promise<string> {
    const HOST = `${this.configService.get(PROXY_HOST)}:${this.configService.get(PROXY_PORT)}`;
    return await firstValueFrom(
      this.httpService.post(`http://${HOST}/${path}`, params).pipe(map((response) => response.data)),
    );
  }
}
