export declare class OrderInput {
    userId: string;
    clientId: string;
    details: {
        productId: string;
        quantity: number;
    }[];
    paid?: boolean;
    total?: number;
}
