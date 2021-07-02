export interface InvoiceRequest {
  issuer: Issuer;
  paymentMethods: PaymentMethods;
  invoiceHeader: InvoiceHeader;
  invoiceSummary: InvoiceSummary;
  invoiceDetails: InvoiceDetails;
  API_InvoiceDetails: {
    API_Issuer: API_Issuer;
    API_Counterpart: API_Counterpart;
    API_Additionals: API_Additionals;
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

export interface PaymentMethods {
  paymentMethodDetails: {
    type: string;
    amount: string;
    paymentMethodInfo: string;
  };
}

export interface Issuer {
  vatNumber: string;
  country: string;
  branch?: string;
}

export interface InvoiceHeader {
  series: string;
  aa?: string;
  issueDate?: string;
  invoiceType: string;
  vatPaymentSuspension: string;
  currency: string;
}

export interface InvoiceDetails {
  lineNumber: string;
  lineCode: string;
  measurementUnitLabel: string;
  lineUnitPrice: string;
  totalNetPriceBeforeDiscount: string;
  totalDiscountValue: string;
  netValue: string;
  vatCategory: string;
  vatCategoryPercent: string;
  vatAmount: string;
  deductionsAmount: string;
  lineComments: string;
  lineDescription: string;
}

export interface InvoiceSummary {
  totalNetValue: string;
  totalVatAmount: string;
  totalWithheldAmount: string;
  totalFeesAmount: string;
  totalStampDutyAmount: string;
  totalOtherTaxesAmount: string;
  totalDeductionsAmount: string;
  totalGrossValue: string;
}

export interface API_Issuer {
  IssuerName: string;
  IssuerProfession: string;
  IssuerTaxoffice: string;
  IssuerAddressStreet: string;
  IssuerAddressNumber: string;
  IssuerAddressPostalCode: string;
  IssuerAddressCity: string;
  IssuerAddressCountry: string;
  IssuerPhone: string;
  IssuerFax: string | null;
  IssuerEmail: string;
  IssuerWebSite: string;
  IssuerRegistryNumber: string;
  IssuerEmtyLine: string | null;
}

export interface API_Counterpart {
  CounterpartCode: string;
  CounterpartName: string;
  CounterpartProfession: string;
  CounterpartTaxoffice: string;
  CounterpartAddressStreet: string;
  CounterpartAddressNumber: string;
  CounterpartAddressPostalCode: string;
  CounterpartAddressCity: string;
  CounterpartAddressCountry: string;
  CounterpartPhone: string;
  CounterpartEmail: string;
}

export interface API_Additionals {
  DocumentLabel: string;
  DocumentComments: string;
  paymentMethodInvoiceLabel: string;
}
