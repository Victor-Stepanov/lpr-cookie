import 'dotenv/config';

import { buildApp, AppOptions } from './app';
import { routes } from './routes';

const { PORT = 3000, HOST } = process.env;

const options: AppOptions = {
  logger: true,
};

const start = async () => {
  const app = await buildApp(options);
  app.register(routes);

  try {
    await app.listen({
      port: +PORT,
      host: HOST,
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
