import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from '@react-pdf/renderer';
import { RiskAssessmentData, RiskItem, RiskLevel } from './types';

// ─── Brand constants ──────────────────────────────────────────────────────────
const CHARCOAL = '#1C1C1E';
const GOLD = '#C9A84C';
const WHITE = '#FFFFFF';
const LIGHT_GREY = '#F5F5F5';
const MID_GREY = '#E0E0E0';
const TEXT_DARK = '#1C1C1E';
const TEXT_MID = '#4A4A4A';
const TEXT_LIGHT = '#767676';

// Risk level colours
const GREEN = '#22C55E';
const AMBER = '#F59E0B';
const RED = '#EF4444';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-SG', { day: '2-digit', month: 'long', year: 'numeric' });
}

function getRiskScore(item: RiskItem): number {
  return item.likelihood * item.severity;
}

function getRiskLevelFromScore(score: number): RiskLevel {
  if (score <= 4) return 'Low';
  if (score <= 9) return 'Medium';
  return 'High';
}

function getRiskColor(level: RiskLevel): string {
  if (level === 'Low') return GREEN;
  if (level === 'Medium') return AMBER;
  return RED;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
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
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: GOLD,
    letterSpacing: 2,
  },
  docSubLabel: {
    fontSize: 9,
    color: '#CCCCCC',
    marginTop: 3,
    letterSpacing: 1,
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
  // Body
  body: {
    paddingHorizontal: 40,
    paddingTop: 24,
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
  // Info grid
  infoGrid: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  infoCell: {
    width: '50%',
    marginBottom: 8,
  },
  infoCellFull: {
    width: '100%',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: GOLD,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 9,
    color: TEXT_DARK,
  },
  infoValueLight: {
    fontSize: 9,
    color: TEXT_MID,
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
  // Risk table
  riskTable: {
    marginBottom: 20,
  },
  riskTableHeader: {
    flexDirection: 'row',
    backgroundColor: CHARCOAL,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  riskHeaderCell: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  riskRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: MID_GREY,
    borderBottomStyle: 'solid',
  },
  riskRowAlt: {
    backgroundColor: LIGHT_GREY,
  },
  riskCell: {
    fontSize: 8,
    color: TEXT_DARK,
  },
  riskCellLight: {
    fontSize: 8,
    color: TEXT_MID,
  },
  // Column widths for risk table
  colActivity: { width: '13%' },
  colHazard: { width: '13%' },
  colPersonsAtRisk: { width: '11%' },
  colL: { width: '5%', textAlign: 'center' },
  colS: { width: '5%', textAlign: 'center' },
  colRiskLevel: { width: '7%', textAlign: 'center' },
  colControl: { width: '27%' },
  colResidual: { width: '9%', textAlign: 'center' },
  colPIC: { width: '10%' },
  // Risk badge
  riskBadge: {
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignSelf: 'center',
  },
  riskBadgeText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
    textAlign: 'center',
  },
  // Declaration section
  declarationBlock: {
    backgroundColor: LIGHT_GREY,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
  },
  declarationTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_DARK,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  signaturesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBlock: {
    width: '45%',
  },
  signatureLabel: {
    fontSize: 7,
    color: TEXT_LIGHT,
    marginBottom: 4,
  },
  signatureLine: {
    height: 1,
    backgroundColor: TEXT_MID,
    marginBottom: 4,
    marginTop: 24,
  },
  signatureName: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_DARK,
  },
  signatureDesig: {
    fontSize: 8,
    color: TEXT_MID,
    marginTop: 2,
  },
  signatureDate: {
    fontSize: 8,
    color: TEXT_LIGHT,
    marginTop: 2,
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
    marginBottom: 16,
  },
  // Risk legend
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    fontSize: 8,
    color: TEXT_MID,
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function RiskBadge({ level }: { level: RiskLevel }) {
  const color = getRiskColor(level);
  return (
    <View style={[styles.riskBadge, { backgroundColor: color }]}>
      <Text style={styles.riskBadgeText}>{level}</Text>
    </View>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RiskAssessmentDocument({ data }: { data: RiskAssessmentData }) {
  const contractor = data.contractor || 'ATRELLIS Pte. Ltd.';

  return (
    <Document title={`Risk Assessment ${data.raNumber}`} author="ATRELLIS Pte. Ltd.">
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.companyName}>ATRELLIS</Text>
            <View style={styles.goldBar} />
            <Text style={styles.companyDetail}>ATRELLIS Pte. Ltd.  |  UEN: 202555777G</Text>
            <Text style={styles.companyDetail}>+65 9222 3333  |  atrellis.business</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.docTypeLabel}>RISK ASSESSMENT</Text>
            <Text style={styles.docSubLabel}>WORKPLACE SAFETY & HEALTH</Text>
            <Text style={styles.docNumber}>{data.raNumber}</Text>
            <Text style={styles.docDate}>Date: {formatDate(data.date)}</Text>
            {data.reviewDate ? (
              <Text style={styles.docDate}>Review: {formatDate(data.reviewDate)}</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.body}>
          {/* Project Info */}
          <View style={styles.projectBlock}>
            <Text style={styles.projectLabel}>Project Details</Text>
            <Text style={styles.projectName}>{data.project.name}</Text>
            <Text style={styles.projectAddress}>{data.project.address}</Text>
            {data.project.description ? (
              <Text style={styles.projectDesc}>{data.project.description}</Text>
            ) : null}
          </View>

          {/* Document Info Grid */}
          <View style={styles.infoGrid}>
            <View style={styles.infoCell}>
              <Text style={styles.infoLabel}>Client</Text>
              <Text style={styles.infoValue}>{data.client.name}</Text>
              {data.client.company ? (
                <Text style={styles.infoValueLight}>{data.client.company}</Text>
              ) : null}
            </View>
            <View style={styles.infoCell}>
              <Text style={styles.infoLabel}>Contractor</Text>
              <Text style={styles.infoValue}>{contractor}</Text>
            </View>
            <View style={styles.infoCell}>
              <Text style={styles.infoLabel}>Assessor</Text>
              <Text style={styles.infoValue}>{data.assessorName}</Text>
              {data.assessorDesignation ? (
                <Text style={styles.infoValueLight}>{data.assessorDesignation}</Text>
              ) : null}
            </View>
            {data.supervisorName ? (
              <View style={styles.infoCell}>
                <Text style={styles.infoLabel}>Supervisor</Text>
                <Text style={styles.infoValue}>{data.supervisorName}</Text>
              </View>
            ) : null}
          </View>

          {/* Risk Legend */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: GREEN }]} />
              <Text style={styles.legendText}>Low (1–4)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: AMBER }]} />
              <Text style={styles.legendText}>Medium (5–9)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: RED }]} />
              <Text style={styles.legendText}>High (10–25)</Text>
            </View>
            <Text style={[styles.legendText, { color: TEXT_LIGHT }]}>
              {'  '}Risk Level = Likelihood (L) × Severity (S)
            </Text>
          </View>

          {/* Risk Matrix Table */}
          <Text style={styles.sectionTitle}>Risk Register</Text>
          <View style={styles.riskTable}>
            {/* Table Header */}
            <View style={styles.riskTableHeader}>
              <Text style={[styles.riskHeaderCell, styles.colActivity]}>Activity</Text>
              <Text style={[styles.riskHeaderCell, styles.colHazard]}>Hazard</Text>
              <Text style={[styles.riskHeaderCell, styles.colPersonsAtRisk]}>Persons at Risk</Text>
              <Text style={[styles.riskHeaderCell, styles.colL]}>L</Text>
              <Text style={[styles.riskHeaderCell, styles.colS]}>S</Text>
              <Text style={[styles.riskHeaderCell, styles.colRiskLevel]}>L×S</Text>
              <Text style={[styles.riskHeaderCell, styles.colControl]}>Control Measures</Text>
              <Text style={[styles.riskHeaderCell, styles.colResidual]}>Residual</Text>
              <Text style={[styles.riskHeaderCell, styles.colPIC]}>PIC</Text>
            </View>

            {/* Table Rows */}
            {data.riskItems.map((item, i) => {
              const score = getRiskScore(item);
              const computedLevel = getRiskLevelFromScore(score);
              return (
                <View
                  key={i}
                  style={[styles.riskRow, i % 2 === 1 ? styles.riskRowAlt : {}]}
                  wrap={false}
                >
                  <Text style={[styles.riskCell, styles.colActivity]}>{item.activity}</Text>
                  <Text style={[styles.riskCellLight, styles.colHazard]}>{item.hazard}</Text>
                  <Text style={[styles.riskCellLight, styles.colPersonsAtRisk]}>{item.personsAtRisk}</Text>
                  <Text style={[styles.riskCell, styles.colL, { textAlign: 'center' }]}>{item.likelihood}</Text>
                  <Text style={[styles.riskCell, styles.colS, { textAlign: 'center' }]}>{item.severity}</Text>
                  <Text style={[styles.riskCell, styles.colRiskLevel, { textAlign: 'center', fontFamily: 'Helvetica-Bold' }]}>
                    {score}
                  </Text>
                  <Text style={[styles.riskCellLight, styles.colControl]}>{item.controlMeasures}</Text>
                  <View style={[styles.colResidual, { alignItems: 'center' }]}>
                    <RiskBadge level={item.residualRisk} />
                  </View>
                  <Text style={[styles.riskCell, styles.colPIC]}>{item.personInCharge}</Text>
                </View>
              );
            })}
          </View>

          <View style={styles.divider} />

          {/* Notes */}
          {data.notes ? (
            <View style={styles.notesBlock}>
              <Text style={styles.sectionTitle}>Notes</Text>
              <Text style={styles.noteText}>{data.notes}</Text>
            </View>
          ) : null}

          {/* Declaration */}
          <View style={styles.declarationBlock}>
            <Text style={styles.declarationTitle}>Declaration</Text>
            <Text style={[styles.noteText, { marginBottom: 12 }]}>
              I declare that the risk assessment has been conducted in accordance with the Workplace Safety and Health (Risk Management) Regulations and that the control measures identified are adequate and implemented.
            </Text>
            <View style={styles.signaturesRow}>
              <View style={styles.signatureBlock}>
                <Text style={styles.signatureLabel}>Assessor</Text>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureName}>{data.assessorName}</Text>
                {data.assessorDesignation ? (
                  <Text style={styles.signatureDesig}>{data.assessorDesignation}</Text>
                ) : null}
                <Text style={styles.signatureDate}>Date: {formatDate(data.date)}</Text>
              </View>
              {data.supervisorName ? (
                <View style={styles.signatureBlock}>
                  <Text style={styles.signatureLabel}>Supervisor / Approved by</Text>
                  <View style={styles.signatureLine} />
                  <Text style={styles.signatureName}>{data.supervisorName}</Text>
                  <Text style={styles.signatureDate}>Date: ___________________</Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            This document is prepared in accordance with WSH (Risk Management) Regulations, Singapore.
          </Text>
          <Text style={styles.footerGold}>ATRELLIS Pte. Ltd.</Text>
        </View>
      </Page>
    </Document>
  );
}
