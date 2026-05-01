import { renderToBuffer, DocumentProps } from '@react-pdf/renderer';
import React from 'react';
import { QuotationDocument } from './quotation';
import { RiskAssessmentDocument } from './risk-assessment';
import { InvoiceDocument } from './invoice';
import { QuotationData, RiskAssessmentData, InvoiceData } from './types';

// renderToBuffer expects ReactElement<DocumentProps>; we cast our wrappers since
// they render a <Document> root, which satisfies the constraint at runtime.
type PDFElement = React.ReactElement<DocumentProps>;

/**
 * Generate a PDF buffer for a quotation document.
 */
export async function generateQuotationPDF(data: QuotationData): Promise<Buffer> {
  const element = React.createElement(QuotationDocument, { data }) as unknown as PDFElement;
  return renderToBuffer(element);
}

/**
 * Generate a PDF buffer for a risk assessment document.
 */
export async function generateRiskAssessmentPDF(data: RiskAssessmentData): Promise<Buffer> {
  const element = React.createElement(RiskAssessmentDocument, { data }) as unknown as PDFElement;
  return renderToBuffer(element);
}

/**
 * Generate a PDF buffer for an invoice document.
 */
export async function generateInvoicePDF(data: InvoiceData): Promise<Buffer> {
  const element = React.createElement(InvoiceDocument, { data }) as unknown as PDFElement;
  return renderToBuffer(element);
}
