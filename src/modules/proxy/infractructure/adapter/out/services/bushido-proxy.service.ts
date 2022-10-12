import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ShowMarketOffersInput } from '../../../../../market/infrastructure/adapters/in/graphql/input';
import { MarketObject } from '../../../../../market/infrastructure/adapters/in/graphql/models';
import { map } from 'rxjs/operators';
import { BushidoProxyService } from '../../../ports/bushido-proxy.service';
import { IDomainData } from 'src/modules/proxy/application/query';

@Injectable()
export class BushidoProxyServiceImplement implements BushidoProxyService {
  constructor(private readonly httpService: HttpService) {}

  async requestOffers(params: ShowMarketOffersInput | IDomainData, path: string): Promise<MarketObject> {
    return await firstValueFrom(
      this.httpService.post(`http://localhost:8080/${path}`, params).pipe(map((response) => response.data)),
    );
  }

  async requestDomainState(params: IDomainData, path: string): Promise<string> {
    return await firstValueFrom(
      this.httpService.post(`http://localhost:8080/${path}`, params).pipe(map((response) => response.data)),
    );
  }
}
