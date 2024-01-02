
import dotenv from "dotenv";
dotenv.config();

import { server } from './server';
import { PORT } from './config';

async function main() {
 
  const app = await server();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main().catch(err => {
  console.error('Ошибка при инициализации приложения:', err);
});
