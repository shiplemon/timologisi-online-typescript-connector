export interface paymentMethodDetails {
  type?: string;
  amount?: string;
  paymentMethodInfo?: string;
}

export interface paymentMethods {
  paymentMethodDetails?: paymentMethodDetails;
}

export interface invoiceHeader {
  series: string;
  aa?: string;
  issueDate?: string;
  invoiceType: string;
  vatPaymentSuspension: string;
  currency: string;
}

export interface invoiceSummary {
  totalNetValue: string;
  totalVatAmount: string;
  totalWithheldAmount: string;
  totalFeesAmount: string;
  totalStampDutyAmount: string;
  totalOtherTaxesAmount: string;
  totalDeductionsAmount: string;
  totalGrossValue: string;
}

export interface invoiceDetail {
  lineNumber?: string;
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
}

export type invoiceDetails = invoiceDetail[];

export interface API_Counterpart {
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
}

export interface API_Additionals {
  DocumentLabel?: string;
  DocumentComments?: string;
  paymentMethodInvoiceLabel?: string;
  Logo_ID?: string;
}

export interface API_InvoiceDetails {
  API_Counterpart?: API_Counterpart;
  API_Additionals?: API_Additionals;
}

export interface Issuer {
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
}

export interface InvoiceRequest {
  paymentMethods?: paymentMethods;
  invoiceHeader: invoiceHeader;
  invoiceSummary?: invoiceSummary;
  invoiceDetails: invoiceDetails;
  API_InvoiceDetails?: API_InvoiceDetails;
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
  issuer: Issuer;
}
