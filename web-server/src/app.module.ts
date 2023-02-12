import { OpenTelemetryModule } from '@metinseylan/nestjs-opentelemetry';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import {
    SimpleSpanProcessor,
    TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-base';

@Module({
    imports: [
        ConfigModule.forRoot(),
        OpenTelemetryModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async () => ({
                instrumentations: [],
                sampler: new TraceIdRatioBasedSampler(0.25),
                serviceName: 'web-service',
                spanProcessor: new SimpleSpanProcessor(new JaegerExporter()),
            }),
            inject: [ConfigService]
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'admin',
            password: 'password',
            database: 'postgres',
            entities: [],
            synchronize: false,
        })
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}