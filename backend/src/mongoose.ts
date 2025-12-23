import { Provider } from "@nestjs/common";
import { connect } from "mongoose";

export const MongooseDataBaseProvider: Provider = 
  {
    provide: 'NoSQL',
    useFactory: async () => {
      try {
        //mongodb://admin:password@mongodb:27017/mongodb
        //mongodb://admin:password@localhost:27017/mongodb
        const connection = await connect( `mongodb://admin:password@localhost:27017/`, {dbName: 'ventas_db' })
        return connection;
      } catch (error) {
        console.log(`Error al conectar a MongoDB: ${error.message}`);
        throw error;
      }
    },
  }
