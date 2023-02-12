# NestJS OpenTelemetry

To clear data and rebuild the jaeger container: 
```sh
docker-compose down && docker-compose up jaeger postgres --build -d
```

To start web server
```sh
cd web-server
npm i
npm start
```

Observe that the `web-service` is visible in Jaeger dashboard here:
http://localhost:16686/search

Then, comment out the typeorm lines in `web-server/src/app.module.ts` like so:

```ts
// TypeOrmModule.forRoot({
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'admin',
//     password: 'password',
//     database: 'postgres',
//     entities: [],
//     synchronize: false,
// })
```

Rerun the top two commands (being sure that the Jaeger data is cleared).

Observe `web-service` is no longer populated in the Jaeger dashboard.