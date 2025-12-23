"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseDataBaseProvider = void 0;
const mongoose_1 = require("mongoose");
exports.MongooseDataBaseProvider = {
    provide: 'NoSQL',
    useFactory: async () => {
        try {
            const connection = await (0, mongoose_1.connect)(`mongodb://admin:password@localhost:27017/`, { dbName: 'ventas_db' });
            return connection;
        }
        catch (error) {
            console.log(`Error al conectar a MongoDB: ${error.message}`);
            throw error;
        }
    },
};
//# sourceMappingURL=mongoose.js.map