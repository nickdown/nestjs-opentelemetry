import { OpenTelemetryModule } from '@metinseylan/nestjs-opentelemetry';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import {
    SimpleSpanProcessor,
    TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-base';
import { AppController } from './app.controller'

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
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}