import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { BushidoProxyService } from '../../../ports/bushido-proxy.service';
import { ShowMarketOffersInput } from '../../in/graphql/input';
import { MarketObject } from '../../in/graphql/models';
import { map } from 'rxjs/operators';

@Injectable()
export class BushidoProxyServiceImplement implements BushidoProxyService {
  constructor(private readonly httpService: HttpService) {}

  async requestOffers(params: ShowMarketOffersInput): Promise<MarketObject> {
    try {
      return await firstValueFrom(
        this.httpService.post('http://localhost:8080/market_offers', params).pipe(map((response) => response.data)),
      );
    } catch (e) {
      console.log(e);
      return {
        offers: [],
        price: '0',
      };
    }
  }
}
