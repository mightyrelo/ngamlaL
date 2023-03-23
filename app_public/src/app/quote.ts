export class QuoteItem {
    product: string;
    quantity: number;
    productAmount: number;
    description: string;
}

export class Quote {
    _id: string;
    quoteItems: QuoteItem[];
    summary: string;
    amount: number;
    expense: number;
    profit: number;
    flagged: boolean;
}
