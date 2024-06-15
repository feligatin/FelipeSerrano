import { createExpressServer } from "routing-controllers";
import 'dotenv/config';
import * as cors from 'cors';

let PORT = 3002;

const corsOptions = {
  origin: 'http://localhost:4200', 
  optionsSuccessStatus: 200 
};

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  cors: corsOptions,
  routePrefix: "/bp", 

  controllers: [
    __dirname + "/controllers/*{.js,.ts}",
  ], // we specify controllers we want to use
});

// run express application on port 3000
app.listen(PORT, () => {
  console.log(`Servidor Iniciado`);
  console.log(`Host: http://localhost:${PORT}`);
  console.log(`Fecha/Hora: ${new Date().toLocaleString()}`);
});
