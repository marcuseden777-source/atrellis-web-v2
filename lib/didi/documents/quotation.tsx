import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from '@react-pdf/renderer';
import { QuotationData } from './types';

// ─── Brand constants ──────────────────────────────────────────────────────────
const CHARCOAL = '#1C1C1E';
const GOLD = '#C9A84C';
const WHITE = '#FFFFFF';
const LIGHT_GREY = '#F5F5F5';
const MID_GREY = '#E0E0E0';
const TEXT_DARK = '#1C1C1E';
const TEXT_MID = '#4A4A4A';
const TEXT_LIGHT = '#767676';

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
  // Body padding wrapper
  body: {
    paddingHorizontal: 40,
    paddingTop: 28,
  },
  // Parties row
  partiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
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
    marginBottom: 24,
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
  // Payment terms
  termsBlock: {
    backgroundColor: LIGHT_GREY,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  termsLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_DARK,
    marginBottom: 4,
  },
  termsText: {
    fontSize: 9,
    color: TEXT_MID,
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
  // Valid for
  validNote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  validDot: {
    width: 5,
    height: 5,
    backgroundColor: GOLD,
    borderRadius: 3,
    marginRight: 6,
  },
  validText: {
    fontSize: 9,
    color: TEXT_LIGHT,
    fontFamily: 'Helvetica-Oblique',
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
  // Divider
  divider: {
    height: 1,
    backgroundColor: MID_GREY,
    marginBottom: 20,
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

// ─── Component ────────────────────────────────────────────────────────────────

export function QuotationDocument({ data }: { data: QuotationData }) {
  const gstRate = data.gstRate ?? 0.09;
  const validDays = data.validDays ?? 30;

  return (
    <Document title={`Quotation ${data.quoteNumber}`} author="ATRELLIS Pte. Ltd.">
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
            <Text style={styles.docTypeLabel}>QUOTATION</Text>
            <Text style={styles.docNumber}>{data.quoteNumber}</Text>
            <Text style={styles.docDate}>Date: {formatDate(data.date)}</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* Parties */}
          <View style={styles.partiesRow}>
            <View style={styles.partyBlock}>
              <Text style={styles.partyLabel}>Prepared For</Text>
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
              <Text style={styles.partyLabel}>Prepared By</Text>
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

          {/* Line Items Table */}
          <Text style={styles.sectionTitle}>Scope of Works</Text>
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
                <Text style={styles.totalFinalLabel}>TOTAL</Text>
                <Text style={styles.totalFinalValue}>{formatCurrency(data.total)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Payment Terms */}
          <Text style={styles.sectionTitle}>Payment Terms</Text>
          <View style={styles.termsBlock}>
            <Text style={styles.termsText}>{data.paymentTerms}</Text>
          </View>

          {/* Notes */}
          {data.notes ? (
            <View style={styles.notesBlock}>
              <Text style={styles.sectionTitle}>Notes</Text>
              <Text style={styles.noteText}>{data.notes}</Text>
            </View>
          ) : null}

          {/* Validity */}
          <View style={styles.validNote}>
            <View style={styles.validDot} />
            <Text style={styles.validText}>
              This quotation is valid for {validDays} days from the date of issue.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            This quotation is computer generated and valid without signature.
          </Text>
          <Text style={styles.footerGold}>ATRELLIS Pte. Ltd.</Text>
        </View>
      </Page>
    </Document>
  );
}
