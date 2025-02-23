import { Config } from './infrastructure/configuration/env/dotenv.config';
import { app } from './infrastructure/configuration/core/app.config';
import dotenv from 'dotenv';

const config = Config.getInstance();
const PORT = config.port;
dotenv.config();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
