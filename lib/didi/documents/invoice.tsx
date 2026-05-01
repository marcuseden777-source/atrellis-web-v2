import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from '@react-pdf/renderer';
import { InvoiceData } from './types';

// ─── Brand constants ──────────────────────────────────────────────────────────
const CHARCOAL = '#1C1C1E';
const GOLD = '#C9A84C';
const WHITE = '#FFFFFF';
const LIGHT_GREY = '#F5F5F5';
const MID_GREY = '#E0E0E0';
const TEXT_DARK = '#1C1C1E';
const TEXT_MID = '#4A4A4A';
const TEXT_LIGHT = '#767676';
const RED = '#EF4444';
const RED_LIGHT = '#FEF2F2';

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: TEXT_DARK,
    backgroundColor: WHITE,
    paddingTop: 0,
    paddingBottom: 50,
    paddingHorizontal: 0,
  },
  // Header
  header: {
    backgroundColor: CHARCOAL,
    paddingHorizontal: 40,
    paddingTop: 32,
    paddingBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flexDirection: 'column',
  },
  companyName: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
    letterSpacing: 4,
  },
  goldBar: {
    width: 40,
    height: 3,
    backgroundColor: GOLD,
    marginTop: 6,
    marginBottom: 8,
  },
  companyDetail: {
    fontSize: 8,
    color: '#A0A0A0',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  docTypeLabel: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: GOLD,
    letterSpacing: 2,
  },
  docNumber: {
    fontSize: 10,
    color: '#CCCCCC',
    marginTop: 4,
  },
  docDate: {
    fontSize: 9,
    color: '#A0A0A0',
    marginTop: 3,
  },
  // Overdue banner
  overdueBanner: {
    backgroundColor: RED,
    paddingVertical: 8,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overdueBannerText: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
    letterSpacing: 3,
  },
  // Due date highlight (non-overdue)
  dueDateBanner: {
    backgroundColor: LIGHT_GREY,
    paddingVertical: 8,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dueDateLabel: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_MID,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  dueDateValue: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_DARK,
  },
  dueDateValueOverdue: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: RED,
  },
  // Body padding wrapper
  body: {
    paddingHorizontal: 40,
    paddingTop: 24,
  },
  // Parties row
  partiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  partyBlock: {
    flexDirection: 'column',
    width: '46%',
  },
  partyLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: GOLD,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  partyName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_DARK,
    marginBottom: 2,
  },
  partyDetail: {
    fontSize: 9,
    color: TEXT_MID,
    marginTop: 1,
  },
  // Project block
  projectBlock: {
    backgroundColor: LIGHT_GREY,
    borderLeftWidth: 3,
    borderLeftColor: GOLD,
    borderLeftStyle: 'solid',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
  },
  projectLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: GOLD,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  projectName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_DARK,
    marginBottom: 2,
  },
  projectAddress: {
    fontSize: 9,
    color: TEXT_MID,
  },
  projectDesc: {
    fontSize: 9,
    color: TEXT_MID,
    marginTop: 3,
  },
  // Quotation reference
  quotationRef: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quotationRefLabel: {
    fontSize: 9,
    color: TEXT_LIGHT,
    marginRight: 6,
  },
  quotationRefValue: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_MID,
  },
  // Section title
  sectionTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: GOLD,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  // Table
  table: {
    marginBottom: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: CHARCOAL,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  tableHeaderCell: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: MID_GREY,
    borderBottomStyle: 'solid',
  },
  tableRowAlt: {
    backgroundColor: LIGHT_GREY,
  },
  tableCell: {
    fontSize: 9,
    color: TEXT_DARK,
  },
  // Column widths
  colDesc: { width: '45%' },
  colQty: { width: '8%', textAlign: 'right' },
  colUnit: { width: '8%', textAlign: 'center' },
  colUnitPrice: { width: '17%', textAlign: 'right' },
  colAmount: { width: '22%', textAlign: 'right' },
  // Totals
  totalsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    marginBottom: 24,
  },
  totalsBlock: {
    width: '42%',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: MID_GREY,
    borderBottomStyle: 'solid',
  },
  totalLabel: {
    fontSize: 9,
    color: TEXT_MID,
  },
  totalValue: {
    fontSize: 9,
    color: TEXT_DARK,
    textAlign: 'right',
  },
  totalFinalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: CHARCOAL,
    marginTop: 4,
  },
  totalFinalLabel: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: GOLD,
  },
  totalFinalValue: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
  },
  // Payment section
  paymentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  paymentBlock: {
    width: '46%',
    backgroundColor: LIGHT_GREY,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  paymentBlockOverdue: {
    width: '46%',
    backgroundColor: RED_LIGHT,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderLeftWidth: 3,
    borderLeftColor: RED,
    borderLeftStyle: 'solid',
  },
  paymentLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: GOLD,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  paymentKey: {
    fontSize: 8,
    color: TEXT_LIGHT,
    width: '45%',
  },
  paymentValue: {
    fontSize: 8,
    color: TEXT_DARK,
    fontFamily: 'Helvetica-Bold',
    width: '55%',
  },
  paynowBlock: {
    width: '46%',
    borderWidth: 1,
    borderColor: MID_GREY,
    borderStyle: 'solid',
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paynowLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: GOLD,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  paynowUEN: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_DARK,
    marginBottom: 4,
  },
  paynowSubtext: {
    fontSize: 8,
    color: TEXT_LIGHT,
    textAlign: 'center',
  },
  paynowIcon: {
    width: 48,
    height: 48,
    backgroundColor: MID_GREY,
    marginBottom: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paynowIconText: {
    fontSize: 7,
    color: TEXT_LIGHT,
    textAlign: 'center',
  },
  // Notes
  notesBlock: {
    marginBottom: 16,
  },
  noteText: {
    fontSize: 9,
    color: TEXT_MID,
    marginTop: 2,
  },
  // Divider
  divider: {
    height: 1,
    backgroundColor: MID_GREY,
    marginBottom: 20,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: CHARCOAL,
    paddingVertical: 10,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 7,
    color: '#888888',
  },
  footerGold: {
    fontSize: 7,
    color: GOLD,
  },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(amount: number): string {
  return `S$ ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-SG', { day: '2-digit', month: 'long', year: 'numeric' });
}

function isOverdue(dueDate: string, status?: string): boolean {
  if (status === 'paid') return false;
  if (status === 'overdue') return true;
  return new Date(dueDate) < new Date();
}

// ─── Component ────────────────────────────────────────────────────────────────

export function InvoiceDocument({ data }: { data: InvoiceData }) {
  const gstRate = data.gstRate ?? 0.09;
  const overdue = isOverdue(data.dueDate, data.status);

  return (
    <Document title={`Invoice ${data.invoiceNumber}`} author="ATRELLIS Pte. Ltd.">
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.companyName}>ATRELLIS</Text>
            <View style={styles.goldBar} />
            <Text style={styles.companyDetail}>ATRELLIS Pte. Ltd.  |  UEN: 202555777G</Text>
            <Text style={styles.companyDetail}>+65 9222 3333  |  atrellis.business</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.docTypeLabel}>INVOICE</Text>
            <Text style={styles.docNumber}>{data.invoiceNumber}</Text>
            <Text style={styles.docDate}>Date: {formatDate(data.date)}</Text>
          </View>
        </View>

        {/* Overdue Banner or Due Date Banner */}
        {overdue ? (
          <View style={styles.overdueBanner}>
            <Text style={styles.overdueBannerText}>⚠  OVERDUE  —  PAYMENT REQUIRED</Text>
          </View>
        ) : null}

        <View style={styles.dueDateBanner}>
          <Text style={styles.dueDateLabel}>Due Date</Text>
          <Text style={overdue ? styles.dueDateValueOverdue : styles.dueDateValue}>
            {formatDate(data.dueDate)}
            {overdue ? '  (OVERDUE)' : ''}
          </Text>
        </View>

        <View style={styles.body}>
          {/* Parties */}
          <View style={styles.partiesRow}>
            <View style={styles.partyBlock}>
              <Text style={styles.partyLabel}>Bill To</Text>
              <Text style={styles.partyName}>{data.client.name}</Text>
              {data.client.company ? (
                <Text style={styles.partyDetail}>{data.client.company}</Text>
              ) : null}
              <Text style={styles.partyDetail}>{data.client.address}</Text>
              {data.client.email ? (
                <Text style={styles.partyDetail}>{data.client.email}</Text>
              ) : null}
              {data.client.phone ? (
                <Text style={styles.partyDetail}>{data.client.phone}</Text>
              ) : null}
            </View>
            <View style={styles.partyBlock}>
              <Text style={styles.partyLabel}>From</Text>
              <Text style={styles.partyName}>ATRELLIS Pte. Ltd.</Text>
              <Text style={styles.partyDetail}>UEN: 202555777G</Text>
              <Text style={styles.partyDetail}>+65 9222 3333</Text>
              <Text style={styles.partyDetail}>atrellis.business</Text>
              {data.preparedBy ? (
                <Text style={styles.partyDetail}>Attn: {data.preparedBy}</Text>
              ) : null}
            </View>
          </View>

          {/* Project */}
          <View style={styles.projectBlock}>
            <Text style={styles.projectLabel}>Project</Text>
            <Text style={styles.projectName}>{data.project.name}</Text>
            <Text style={styles.projectAddress}>{data.project.address}</Text>
            {data.project.description ? (
              <Text style={styles.projectDesc}>{data.project.description}</Text>
            ) : null}
          </View>

          {/* Quotation Reference */}
          {data.quotationRef ? (
            <View style={styles.quotationRef}>
              <Text style={styles.quotationRefLabel}>Quotation Reference:</Text>
              <Text style={styles.quotationRefValue}>{data.quotationRef}</Text>
            </View>
          ) : null}

          {/* Line Items Table */}
          <Text style={styles.sectionTitle}>Invoice Items</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.colDesc]}>Description</Text>
              <Text style={[styles.tableHeaderCell, styles.colQty]}>Qty</Text>
              <Text style={[styles.tableHeaderCell, styles.colUnit]}>Unit</Text>
              <Text style={[styles.tableHeaderCell, styles.colUnitPrice]}>Unit Price</Text>
              <Text style={[styles.tableHeaderCell, styles.colAmount]}>Amount</Text>
            </View>
            {/* Table Rows */}
            {data.lineItems.map((item, i) => (
              <View
                key={i}
                style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}
                wrap={false}
              >
                <Text style={[styles.tableCell, styles.colDesc]}>{item.description}</Text>
                <Text style={[styles.tableCell, styles.colQty]}>{item.qty}</Text>
                <Text style={[styles.tableCell, styles.colUnit]}>{item.unit}</Text>
                <Text style={[styles.tableCell, styles.colUnitPrice]}>
                  {formatCurrency(item.unitPrice)}
                </Text>
                <Text style={[styles.tableCell, styles.colAmount]}>
                  {formatCurrency(item.amount)}
                </Text>
              </View>
            ))}
          </View>

          {/* Totals */}
          <View style={styles.totalsWrapper}>
            <View style={styles.totalsBlock}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>{formatCurrency(data.subtotal)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>GST ({(gstRate * 100).toFixed(0)}%)</Text>
                <Text style={styles.totalValue}>{formatCurrency(data.gstAmount)}</Text>
              </View>
              <View style={styles.totalFinalRow}>
                <Text style={styles.totalFinalLabel}>TOTAL DUE</Text>
                <Text style={styles.totalFinalValue}>{formatCurrency(data.total)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Payment Details */}
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.paymentSection}>
            {/* Bank Transfer */}
            <View style={overdue ? styles.paymentBlockOverdue : styles.paymentBlock}>
              <Text style={styles.paymentLabel}>Bank Transfer</Text>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentKey}>Bank</Text>
                <Text style={styles.paymentValue}>{data.bankDetails.bankName}</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentKey}>Account Name</Text>
                <Text style={styles.paymentValue}>{data.bankDetails.accountName}</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentKey}>Account No.</Text>
                <Text style={styles.paymentValue}>{data.bankDetails.accountNumber}</Text>
              </View>
              {data.bankDetails.payNowUEN ? (
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentKey}>PayNow UEN</Text>
                  <Text style={styles.paymentValue}>{data.bankDetails.payNowUEN}</Text>
                </View>
              ) : null}
            </View>

            {/* PayNow */}
            {data.bankDetails.payNowUEN ? (
              <View style={styles.paynowBlock}>
                <Text style={styles.paynowLabel}>PayNow</Text>
                <View style={styles.paynowIcon}>
                  <Text style={styles.paynowIconText}>QR</Text>
                </View>
                <Text style={styles.paynowUEN}>{data.bankDetails.payNowUEN}</Text>
                <Text style={styles.paynowSubtext}>Scan to pay via PayNow</Text>
                <Text style={[styles.paynowSubtext, { marginTop: 4 }]}>
                  Please include invoice no. in reference
                </Text>
              </View>
            ) : null}
          </View>

          {/* Notes */}
          {data.notes ? (
            <View style={styles.notesBlock}>
              <Text style={styles.sectionTitle}>Notes</Text>
              <Text style={styles.noteText}>{data.notes}</Text>
            </View>
          ) : null}
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            This invoice is computer generated and valid without signature.
          </Text>
          <Text style={styles.footerGold}>ATRELLIS Pte. Ltd.</Text>
        </View>
      </Page>
    </Document>
  );
}
