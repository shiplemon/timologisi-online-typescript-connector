import moment from 'moment';
import { j2xParser } from 'fast-xml-parser';
import { InvoiceOptions, InvoiceRequest } from './interface';

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

const makeUniqueId = () => {
  return `${moment().format('YYMMDDHHmmssSSS')}`;
};

export default function invoiceToXml(req: InvoiceRequest, opts: InvoiceOptions) {
  const issueDate = new Date().toISOString().split('T')[0];
  const uniqueID = makeUniqueId();

  const totalNetValue = req.invoiceDetails.reduce((a, c) => a + Number(c.netValue), 0).toFixed(2);
  const totalVatAmount = req.invoiceDetails.reduce((a, c) => a + Number(c.vatAmount), 0).toFixed(2);
  const totalWithheldAmount = 0;
  const totalFeesAmount = 0;
  const totalStampDutyAmount = 0;
  const totalOtherTaxesAmount = 0;
  const totalDeductionsAmount = req.invoiceDetails.reduce((a, c) => a + Number(c.deductionsAmount), 0);
  const totalGrossValue = (Number(totalNetValue) + Number(totalVatAmount)).toFixed(2);

  const xml = parser.parse({
    InvoicesDoc: {
      '@': {
        xmlns: 'http://www.aade.gr/myDATA/invoice/v1.0',
        'xmlns:n1': 'https://www.aade.gr/myDATA/incomeClassificaton/v1.0',
        'xmlns:n2': 'https://www.aade.gr/myDATA/expensesClassificaton/v1.0',
      },
      invoice: {
        issuer: {
          vatNumber: opts.issuer.vatNumber,
          country: opts.issuer.country,
          branch: opts.issuer.branch || 0,
        },
        invoiceHeader: {
          series: req.invoiceHeader.series,
          aa: req.invoiceHeader.aa || uniqueID,
          issueDate: req.invoiceHeader.issueDate || issueDate,
          invoiceType: req.invoiceHeader.invoiceType,
          vatPaymentSuspension: req.invoiceHeader.vatPaymentSuspension,
          currency: req.invoiceHeader.currency,
        },
        paymentMethods: {
          paymentMethodDetails: {
            type: req.paymentMethods?.paymentMethodDetails?.type || 3,
            amount: req.paymentMethods?.paymentMethodDetails?.amount || totalGrossValue,
            paymentMethodInfo: req.paymentMethods?.paymentMethodDetails?.paymentMethodInfo || 'Πληρωμή με κάρτα',
          },
        },
        invoiceDetails: req.invoiceDetails.map((d, idx) => ({
          lineNumber: d.lineNumber || idx + 1,
          lineCode: d.lineCode,
          measurementUnitLabel: d.measurementUnitLabel || 'ΤΜΧ',
          lineUnitPrice: d.lineUnitPrice,
          totalNetPriceBeforeDiscount: d.totalNetPriceBeforeDiscount,
          totalDiscountValue: d.totalDiscountValue,
          netValue: d.netValue,
          vatCategory: d.vatCategory || '1',
          vatCategoryPercent: d.vatCategoryPercent || '24.00',
          vatAmount: d.vatAmount,
          deductionsAmount: d.deductionsAmount,
          lineComments: d.lineComments,
          lineDescription: d.lineDescription,
        })),
        invoiceSummary: {
          totalNetValue,
          totalVatAmount,
          totalWithheldAmount,
          totalFeesAmount,
          totalStampDutyAmount,
          totalOtherTaxesAmount,
          totalDeductionsAmount,
          totalGrossValue,
        },
        API_InvoiceDetails: {
          API_Issuer: {
            IssuerName: opts.issuer.name,
            IssuerProfession: opts.issuer.profession,
            IssuerTaxoffice: opts.issuer.taxoffice,
            IssuerAddressStreet: opts.issuer.addressStreet,
            IssuerAddressNumber: opts.issuer.addressNumber,
            IssuerAddressPostalCode: opts.issuer.addressPostalCode,
            IssuerAddressCity: opts.issuer.addressCity,
            IssuerAddressCountry: opts.issuer.addressCountry,
            IssuerPhone: opts.issuer.phone,
            IssuerFax: opts.issuer.fax || null,
            IssuerEmail: opts.issuer.email,
            IssuerWebSite: opts.issuer.webSite,
            IssuerRegistryNumber: opts.issuer.registryNumber,
            IssuerEmtyLine: null,
          },
          API_Counterpart: {
            CounterpartCode: req.API_InvoiceDetails?.API_Counterpart?.CounterpartCode || ' ',
            CounterpartName: req.API_InvoiceDetails?.API_Counterpart?.CounterpartName || 'Πελατης Λιανικής',
            CounterpartProfession: req.API_InvoiceDetails?.API_Counterpart?.CounterpartProfession || ' ',
            CounterpartTaxoffice: req.API_InvoiceDetails?.API_Counterpart?.CounterpartTaxoffice || ' ',
            CounterpartAddressStreet: req.API_InvoiceDetails?.API_Counterpart?.CounterpartAddressStreet || ' ',
            CounterpartAddressNumber: req.API_InvoiceDetails?.API_Counterpart?.CounterpartAddressNumber || ' ',
            CounterpartAddressPostalCode: req.API_InvoiceDetails?.API_Counterpart?.CounterpartAddressPostalCode || ' ',
            CounterpartAddressCity: req.API_InvoiceDetails?.API_Counterpart?.CounterpartAddressCity || ' ',
            CounterpartAddressCountry: req.API_InvoiceDetails?.API_Counterpart?.CounterpartAddressCountry || ' ',
            CounterpartPhone: req.API_InvoiceDetails?.API_Counterpart?.CounterpartPhone || ' ',
            CounterpartEmail: req.API_InvoiceDetails?.API_Counterpart?.CounterpartEmail || ' ',
          },
          API_Additionals: {
            DocumentLabel: req.API_InvoiceDetails?.API_Additionals?.DocumentLabel || 'Απόδειξη Παροχής Υπηρεσιών',
            DocumentComments: req.API_InvoiceDetails?.API_Additionals?.DocumentComments || ' ',
            paymentMethodInvoiceLabel: req.API_InvoiceDetails?.API_Additionals?.paymentMethodInvoiceLabel || 'ΚΑΡΤΑ',
          },
        },
      },
    },
  });

  return xml;
}
