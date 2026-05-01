// Core types for the Didi agent system

export type PropertyType = 'HDB BTO' | 'HDB Resale' | 'Condo' | 'Landed' | 'Commercial' | 'Shophouse';

export type ProjectType =
  | 'Full Renovation'
  | 'Zipblinds'
  | 'Roofing'
  | 'Carpentry'
  | 'Outdoor / Balcony'
  | 'Commercial Fit-Out'
  | 'Structural Works'
  | 'Partial Renovation';

export type OccupancyStatus = 'Vacant' | 'Occupied during works' | 'New hand-over';

export type QualificationStage =
  | 'greeting'
  | 'collecting_name'
  | 'collecting_contact'
  | 'collecting_address'
  | 'collecting_property_type'
  | 'collecting_project_type'
  | 'collecting_timeline'
  | 'collecting_occupancy'
  | 'qualified'          // All fields collected
  | 'design_consult'     // In design consultation flow
  | 'site_visit_pitched' // Expert Site Investigation offered
  | 'site_visit_booked'  // Appointment confirmed → trigger escalation
  | 'escalated';         // Brief sent to Andrew

export interface LeadData {
  name?: string;
  contactNumber?: string;
  propertyAddress?: string;
  propertyType?: PropertyType;
  projectType?: ProjectType;
  keyCollectionDate?: string;
  occupancyStatus?: OccupancyStatus;
  budgetIndicator?: string;
  stylePreferences?: string[];
  additionalNotes?: string;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ConversationSession {
  sessionId: string;
  channel: 'web' | 'telegram';
  telegramChatId?: number;
  stage: QualificationStage;
  leadData: LeadData;
  messages: ConversationMessage[];
  createdAt: number;
  updatedAt: number;
  isEscalated: boolean;
}

export interface ChatRequest {
  sessionId: string;
  message: string;
  channel?: 'web' | 'telegram';
  imageBase64?: string; // Future: image analysis via Claude vision
}

export interface ChatResponse {
  reply: string;
  stage: QualificationStage;
  leadData: LeadData;
  actionTriggered?: 'lead_captured' | 'site_visit_booked' | 'escalated';
}

export interface PriceEstimate {
  propertyType: PropertyType;
  lowRange: number;
  highRange: number;
  currency: 'SGD';
  notes: string;
}

export interface HybridStyle {
  name: string;
  tagline: string;
  description: string;
  triggerKeywords: string[];
  materials: string[];
  atellisTip: string;
}

export interface TelegramBrief {
  leadName: string;
  contact: string;
  address: string;
  propertyType: string;
  projectType: string;
  timeline: string;
  occupancy: string;
  styleNotes: string;
  budgetIndicator: string;
  sessionId: string;
  timestamp: string;
}
