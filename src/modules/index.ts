import { HealthModule } from 'src/utils/modules/health/health.module';
import { CardsModule } from './cards/cards.module';
import { MarketModule } from './market/market.module';
import { ProxyModule } from './proxy/proxy.module';

export const AppModules = [CardsModule, MarketModule, ProxyModule, HealthModule];
