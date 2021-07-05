export interface InvoiceRequest {
  paymentMethods?: {
    paymentMethodDetails?: {
      type?: string;
      amount?: string;
      paymentMethodInfo?: string;
    };
  };
  invoiceHeader: {
    series: string;
    aa?: string;
    issueDate?: string;
    invoiceType: string;
    vatPaymentSuspension: string;
    currency: string;
  };
  invoiceSummary?: {
    totalNetValue: string;
    totalVatAmount: string;
    totalWithheldAmount: string;
    totalFeesAmount: string;
    totalStampDutyAmount: string;
    totalOtherTaxesAmount: string;
    totalDeductionsAmount: string;
    totalGrossValue: string;
  };
  invoiceDetails: {
    lineNumber: string;
    lineCode: string;
    measurementUnitLabel?: string;
    lineUnitPrice: string;
    totalNetPriceBeforeDiscount: string;
    totalDiscountValue: string;
    netValue: string;
    vatCategory?: string;
    vatCategoryPercent?: string;
    vatAmount: string;
    deductionsAmount: string;
    lineComments: string;
    lineDescription: string;
  }[];
  API_InvoiceDetails?: {
    API_Counterpart?: {
      CounterpartCode?: string;
      CounterpartName?: string;
      CounterpartProfession?: string;
      CounterpartTaxoffice?: string;
      CounterpartAddressStreet?: string;
      CounterpartAddressNumber?: string;
      CounterpartAddressPostalCode?: string;
      CounterpartAddressCity?: string;
      CounterpartAddressCountry?: string;
      CounterpartPhone?: string;
      CounterpartEmail?: string;
    };
    API_Additionals?: {
      DocumentLabel?: string;
      DocumentComments?: string;
      paymentMethodInvoiceLabel?: string;
    };
  };
}

export interface InvoiceResponse {
  index: string;
  statusCode: string;
  invoiceUid: string;
  invoiceMark: string;
  InvoiceUrl: string;
  authenticationCode: string;
  credits: string;
}

export interface InvoiceOptions {
  sandbox: boolean;
  apiKey: string;
  issuer: {
    vatNumber: string;
    branch?: string;
    country: string;

    name: string;
    profession: string;
    taxoffice: string;
    addressStreet: string;
    addressNumber: string;
    addressPostalCode: string;
    addressCity: string;
    addressCountry: string;
    phone: string;
    fax?: string;
    email: string;
    webSite: string;
    registryNumber: string;
  };
}
