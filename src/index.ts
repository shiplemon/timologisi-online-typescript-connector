import invoiceToXml from './invoice';
import parser from 'fast-xml-parser';
import { InvoiceRequest } from './interface';
import { getClient } from './client';

export async function createInvoice(
  req: InvoiceRequest,
  opts: {
    sandbox: boolean;
    apiKey: string;
  },
) {
  const invoiceInXml = invoiceToXml(req);

  console.log('invoiceInXml', invoiceInXml);

  const client = getClient(opts.sandbox, opts.apiKey);

  let res: any;

  try {
    res = await client.post('/SendInvoice', invoiceInXml);
  } catch (e) {
    throw { name: 'ConnectionError', message: e.message, raw: e };
  }

  console.log('res', res);

  if (!res) {
    throw { name: 'ResponseError', message: 'Response is empty', raw: res };
  }

  const json = parser.parse(res);

  console.log('json', JSON.stringify(json, null, 2));

  if (json?.NovusResponseDoc?.response?.errors?.error) {
    throw {
      name: 'ValidationError',
      message: 'Some data you provided caused validation errors to happen',
      raw: json.NovusResponseDoc.response.errors.error,
    };
  }

  return json;
}
