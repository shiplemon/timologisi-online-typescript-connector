import { j2xParser } from 'fast-xml-parser';
import { InvoiceRequest } from './interface';

const parser = new j2xParser({
  attributeNamePrefix: '@',
  attrNodeName: '@', //default is false
  textNodeName: '#text',
  ignoreAttributes: true,
  cdataTagName: '__cdata', //default is false
  cdataPositionChar: '\\c',
  format: true,
  indentBy: '  ',
  supressEmptyNode: true,
});

export default function invoiceToXml(request: InvoiceRequest) {
  const issueDate = new Date().toISOString().split('T')[0];
  const uniqueID = new Date().toISOString().replace(/\D+/g, '');

  const xml = parser.parse({
    InvoicesDoc: {
      '@': {
        xmlns: 'http://www.aade.gr/myDATA/invoice/v1.0',
        'xmlns:n1': 'https://www.aade.gr/myDATA/incomeClassificaton/v1.0',
        'xmlns:n2': 'https://www.aade.gr/myDATA/expensesClassificaton/v1.0',
      },
      invoice: {
        issuer: {
          vatNumber: request.issuer.vatNumber,
          country: request.issuer.country,
          branch: request.issuer.branch || 0,
        },
        invoiceHeader: {
          series: request.invoiceHeader.series,
          aa: request.invoiceHeader.aa || uniqueID,
          issueDate: request.invoiceHeader.issueDate || issueDate,
          invoiceType: request.invoiceHeader.invoiceType,
          vatPaymentSuspension: request.invoiceHeader.vatPaymentSuspension,
          currency: request.invoiceHeader.currency,
        },
        paymentMethods: request.paymentMethods,
        invoiceDetails: {
          lineNumber: request.invoiceDetails.lineNumber,
          lineCode: request.invoiceDetails.lineCode,
          measurementUnitLabel: request.invoiceDetails.measurementUnitLabel,
          lineUnitPrice: request.invoiceDetails.lineUnitPrice,
          totalNetPriceBeforeDiscount: request.invoiceDetails.totalNetPriceBeforeDiscount,
          totalDiscountValue: request.invoiceDetails.totalDiscountValue,
          netValue: request.invoiceDetails.netValue,
          vatCategory: request.invoiceDetails.vatCategory,
          vatCategoryPercent: request.invoiceDetails.vatCategoryPercent,
          vatAmount: request.invoiceDetails.vatAmount,
          deductionsAmount: request.invoiceDetails.deductionsAmount,
          lineComments: request.invoiceDetails.lineComments,
          lineDescription: request.invoiceDetails.lineDescription,
        },
        invoiceSummary: request.invoiceSummary,
        API_Issuer: request.API_InvoiceDetails.API_Issuer,
        API_Counterpart: request.API_InvoiceDetails.API_Counterpart,
        API_Additionals: request.API_InvoiceDetails.API_Additionals,
      },
    },
  });

  return xml;
}
