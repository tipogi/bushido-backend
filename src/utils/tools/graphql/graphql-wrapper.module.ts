import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { AppModules } from 'src/modules';
import { EnvConfigService } from 'src/utils/environment/env.config.service';
import { EnvConfigModule } from 'src/utils/environment/env.config.module';
import { CONFIG_FILE_PATH, DEV, ENV } from 'src/utils/environment/constants';

const GRAPHQL_SCHEMA_PATH = 'src/utils/tools/graphql/schema.gql';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      // Add the driver type
      driver: ApolloDriver,
      imports: [
        EnvConfigModule.register({
          folder: CONFIG_FILE_PATH,
        }),
      ],
      inject: [EnvConfigService],
      // Create on the go the some configuration options
      useFactory: (configService: EnvConfigService): ApolloDriverConfig => {
        return {
          include: [...AppModules],
          // Use code first approach. It generates the corresponding grapQL files (.gql)
          autoSchemaFile: join(process.cwd(), GRAPHQL_SCHEMA_PATH),
          playground: false,
          // To access to graphQL playground host:port/grahpql
          plugins: configService.get(ENV) === DEV ? [ApolloServerPluginLandingPageLocalDefault] : [],
          context: ({ req, res }) => ({ req, res }),
        };
      },
    }),
  ],
})
export class GraphqlWrapperModule {}
