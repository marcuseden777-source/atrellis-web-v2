import { NextRequest, NextResponse } from 'next/server';
import {
  generateQuotationPDF,
  generateRiskAssessmentPDF,
  generateInvoicePDF,
} from '@/lib/didi/documents/generate';
import { QuotationData, RiskAssessmentData, InvoiceData } from '@/lib/didi/documents/types';

export const runtime = 'nodejs';

type DocumentType = 'quotation' | 'risk-assessment' | 'invoice';

interface DocumentRequest {
  type: DocumentType;
  data: QuotationData | RiskAssessmentData | InvoiceData;
}

function getFilename(type: DocumentType, data: QuotationData | RiskAssessmentData | InvoiceData): string {
  switch (type) {
    case 'quotation': {
      const d = data as QuotationData;
      return `${d.quoteNumber}.pdf`;
    }
    case 'risk-assessment': {
      const d = data as RiskAssessmentData;
      return `${d.raNumber}.pdf`;
    }
    case 'invoice': {
      const d = data as InvoiceData;
      return `${d.invoiceNumber}.pdf`;
    }
    default:
      return 'document.pdf';
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<DocumentRequest>;

    if (!body.type || !body.data) {
      return NextResponse.json(
        { error: 'Missing required fields: type and data' },
        { status: 400 }
      );
    }

    const validTypes: DocumentType[] = ['quotation', 'risk-assessment', 'invoice'];
    if (!validTypes.includes(body.type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    let pdfBuffer: Buffer;

    switch (body.type) {
      case 'quotation':
        pdfBuffer = await generateQuotationPDF(body.data as QuotationData);
        break;
      case 'risk-assessment':
        pdfBuffer = await generateRiskAssessmentPDF(body.data as RiskAssessmentData);
        break;
      case 'invoice':
        pdfBuffer = await generateInvoicePDF(body.data as InvoiceData);
        break;
      default:
        return NextResponse.json({ error: 'Unsupported document type' }, { status: 400 });
    }

    const filename = getFilename(body.type, body.data);

    // Slice the ArrayBuffer to get exactly our portion (Buffer may share a larger backing buffer)
    const arrayBuffer = pdfBuffer.buffer.slice(
      pdfBuffer.byteOffset,
      pdfBuffer.byteOffset + pdfBuffer.byteLength
    );

    return new NextResponse(arrayBuffer as ArrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (err) {
    console.error('[/api/didi/documents] Error:', err);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
