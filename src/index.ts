import invoiceToXml from './invoice';
import parser from 'fast-xml-parser';
import { InvoiceRequest, InvoiceResponse, InvoiceOptions } from './interface';
import { getClient } from './client';

export async function createInvoice(req: InvoiceRequest, opts: InvoiceOptions): Promise<InvoiceResponse> {
  const invoiceInXml = invoiceToXml(req, opts);

  const client = getClient(opts.sandbox, opts.apiKey);

  let res: any;
  try {
    res = await client.post('/SendInvoice', invoiceInXml);
  } catch (e) {
    throw { name: 'ConnectionError', message: e.message, raw: e };
  }

  if (!res) {
    throw { name: 'ResponseError', message: 'Response is empty', raw: res };
  }

  let json: any;
  try {
    json = parser.parse(res);
  } catch (e) {
    throw { name: 'ParseError', message: e.message, raw: res };
  }

  if (!json.NovusResponseDoc?.response) {
    throw {
      name: 'ResponseError',
      message: 'Response seems to be broken',
      raw: json,
    };
  }

  if (json.NovusResponseDoc.response?.errors?.error) {
    throw {
      name: 'ValidationError',
      message: 'Some data you provided caused validation errors to happen',
      raw: json,
    };
  }

  if (!json.NovusResponseDoc.response?.invoiceMark) {
    throw {
      name: 'InvoiceError',
      message: 'Invoice MARK is missing',
      raw: json,
    };
  }

  return {
    index: `${json?.NovusResponseDoc?.response.index}`,
    credits: `${json?.NovusResponseDoc?.response.credits}`,
    statusCode: json?.NovusResponseDoc?.response.statusCode,
    InvoiceUrl: json?.NovusResponseDoc?.response.InvoiceUrl,
    invoiceUid: json?.NovusResponseDoc?.response.invoiceUid,
    invoiceMark: `${json?.NovusResponseDoc?.response.invoiceMark}`,
    authenticationCode: json?.NovusResponseDoc?.response.authenticationCode,
  };
}
