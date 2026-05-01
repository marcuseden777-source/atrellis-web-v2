// TypeScript types for Atrellis PDF document generation

// ─── Shared ───────────────────────────────────────────────────────────────────

export interface ClientInfo {
  name: string;
  company?: string;
  address: string;
  email?: string;
  phone?: string;
}

export interface ProjectInfo {
  name: string;
  address: string;
  description?: string;
}

export interface LineItem {
  description: string;
  qty: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

// ─── Quotation ────────────────────────────────────────────────────────────────

export interface QuotationData {
  quoteNumber: string;           // e.g. ATR-Q-2026-001
  date: string;                  // ISO date string
  validDays?: number;            // Default 30
  client: ClientInfo;
  project: ProjectInfo;
  lineItems: LineItem[];
  subtotal: number;
  gstRate?: number;              // Default 0.09 (9%)
  gstAmount: number;
  total: number;
  paymentTerms: string;          // e.g. "50% deposit, 50% on completion"
  notes?: string;
  preparedBy?: string;
}

// ─── Risk Assessment ──────────────────────────────────────────────────────────

export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface RiskItem {
  activity: string;
  hazard: string;
  personsAtRisk: string;
  likelihood: 1 | 2 | 3 | 4 | 5;   // 1 = Rare, 5 = Almost Certain
  severity: 1 | 2 | 3 | 4 | 5;     // 1 = Negligible, 5 = Catastrophic
  controlMeasures: string;
  residualRisk: RiskLevel;
  personInCharge: string;
}

export interface RiskAssessmentData {
  raNumber: string;              // e.g. ATR-RA-2026-001
  date: string;                  // ISO date string
  reviewDate?: string;           // ISO date string
  project: ProjectInfo;
  client: ClientInfo;
  contractor: string;            // Default: "ATRELLIS Pte. Ltd."
  riskItems: RiskItem[];
  assessorName: string;
  assessorDesignation?: string;
  supervisorName?: string;
  notes?: string;
}

// ─── Invoice ──────────────────────────────────────────────────────────────────

export interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  payNowUEN?: string;            // e.g. 202555777G
}

export interface InvoiceData {
  invoiceNumber: string;         // e.g. ATR-INV-2026-001
  date: string;                  // ISO date string — invoice date
  dueDate: string;               // ISO date string
  quotationRef?: string;         // e.g. ATR-Q-2026-001
  client: ClientInfo;
  project: ProjectInfo;
  lineItems: LineItem[];
  subtotal: number;
  gstRate?: number;              // Default 0.09 (9%)
  gstAmount: number;
  total: number;
  bankDetails: BankDetails;
  status?: 'draft' | 'sent' | 'paid' | 'overdue';
  notes?: string;
  preparedBy?: string;
}
