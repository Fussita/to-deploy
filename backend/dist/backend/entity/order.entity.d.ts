import { Document, Types } from 'mongoose';
export declare class OrderDetail {
    product: Types.ObjectId;
    quantity: number;
    total: number;
}
export declare const OrderDetailSchema: import("mongoose").Schema<OrderDetail, import("mongoose").Model<OrderDetail, any, any, any, Document<unknown, any, OrderDetail, any, import("mongoose").DefaultSchemaOptions> & OrderDetail & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, OrderDetail>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrderDetail, Document<unknown, {}, OrderDetail, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrderDetail & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    product?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, OrderDetail, Document<unknown, {}, OrderDetail, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrderDetail & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    quantity?: import("mongoose").SchemaDefinitionProperty<number, OrderDetail, Document<unknown, {}, OrderDetail, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrderDetail & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    total?: import("mongoose").SchemaDefinitionProperty<number, OrderDetail, Document<unknown, {}, OrderDetail, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrderDetail & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, OrderDetail>;
export declare class Order extends Document {
    date: Date;
    user: Types.ObjectId;
    client: Types.ObjectId;
    details: OrderDetail[];
    total: number;
    paid: boolean;
    imageBase64: string;
    orderId: number;
    iva: number;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, Document<unknown, any, Order, any, import("mongoose").DefaultSchemaOptions> & Order & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any, Order>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, Order, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    client?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    date?: import("mongoose").SchemaDefinitionProperty<Date, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    total?: import("mongoose").SchemaDefinitionProperty<number, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    user?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    details?: import("mongoose").SchemaDefinitionProperty<OrderDetail[], Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    paid?: import("mongoose").SchemaDefinitionProperty<boolean, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    imageBase64?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    orderId?: import("mongoose").SchemaDefinitionProperty<number, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    iva?: import("mongoose").SchemaDefinitionProperty<number, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Order>;
