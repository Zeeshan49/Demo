
export interface Payment {
    cardNo?: any;
    cardHolder?: any;
    amountTrxn?: any;
    currencyCode?: any;
    processingCode?: any;
    systemTraceNr?: any
    functionCode?: any
}

export interface PaymentResponse {
    responseCode: any
    message: any
    approvalCode: any
    dateTime: any
}