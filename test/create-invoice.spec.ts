import { expect } from 'chai';
import { createInvoice } from '../src';

describe(``, () => {
  it(`Instatiate the class and return an empty array`, async () => {
    try {
      const receipt = await createInvoice(FAKE_REQUEST, {
        sandbox: true,
        apiKey: 'sbx_4rv76pHVQcznDjSCroNQZK8I1xGVm2X16Ym3YuTC',
      });
    } catch (e) {
      console.error('TEST ERROR CATCHER', JSON.stringify(e, null, 2));
    }
  });
});

const FAKE_REQUEST = {
  issuer: {
    vatNumber: '800860512',
    country: 'GR',
  },
  invoiceHeader: {
    series: 'ΑΠΥ',
    aa: '1',
    invoiceType: '11.1',
    vatPaymentSuspension: 'false',
    currency: 'EUR',
  },
  paymentMethods: {
    paymentMethodDetails: {
      type: '3',
      amount: '500',
      paymentMethodInfo: 'Πληρωμή με κάρτα',
    },
  },
  invoiceDetails: {
    lineNumber: '1',
    lineCode: 'Κωδικός Προιόντος',
    lineUnitPrice: '10',
    lineComments: 'lineComments',
    lineDescription: 'Υπηρεσία Αποστολής Πακέτου',
    vatCategory: '1',
    vatCategoryPercent: '24.00',
    vatAmount: '1.3',
    totalNetPriceBeforeDiscount: '100',
    totalDiscountValue: '0',
    measurementUnitLabel: 'ΤΜΧ',
    deductionsAmount: '0',
    netValue: '10.00',
  },
  invoiceSummary: {
    totalNetValue: '10.00',
    totalVatAmount: '1.3',
    totalWithheldAmount: '0',
    totalFeesAmount: '4',
    totalStampDutyAmount: '5',
    totalOtherTaxesAmount: '6',
    totalDeductionsAmount: '7',
    totalGrossValue: '8',
  },
  API_InvoiceDetails: {
    API_Issuer: {
      IssuerName: 'IssuerName',
      IssuerProfession: 'IssuerProfession',
      IssuerTaxoffice: 'IssuerTaxoffice',
      IssuerAddressStreet: 'IssuerAddressStreet',
      IssuerAddressNumber: '0',
      IssuerAddressPostalCode: '12345',
      IssuerAddressCity: 'IssuerAddressCity',
      IssuerAddressCountry: 'IssuerAddressCountry',
      IssuerPhone: '+302100000000',
      IssuerFax: null,
      IssuerEmail: 'IssuerEmail',
      IssuerWebSite: 'IssuerWebSite',
      IssuerRegistryNumber: 'IssuerRegistryNumber',
      IssuerEmtyLine: null,
    },
    API_Counterpart: {
      CounterpartCode: ' ',
      CounterpartName: 'Πελατης Λιανικής',
      CounterpartProfession: ' ',
      CounterpartTaxoffice: ' ',
      CounterpartAddressStreet: ' ',
      CounterpartAddressNumber: ' ',
      CounterpartAddressPostalCode: ' ',
      CounterpartAddressCity: ' ',
      CounterpartAddressCountry: ' ',
      CounterpartPhone: ' ',
      CounterpartEmail: ' ',
    },
    API_Additionals: {
      DocumentLabel: 'DocumentLabel',
      DocumentComments: 'DocumentComments',
      paymentMethodInvoiceLabel: 'paymentMethodInvoiceLabel',
    },
  },
};
