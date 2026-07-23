export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: 'education' | 'career' | 'milestone';
}

export interface AlumniInsight {
  id: string;
  userId?: string;
  name: string;
  role: string;
  avatar: string; // Avatar name or character id
  isCustomAvatar?: boolean;
  institution: string;
  yearCompleted: string;
  experience: string;
  advice: string;
  rating: number;
  timeline: TimelineEvent[];
  authorEmail?: string;
  likes?: number;
  replies?: {
    id: string;
    author: string;
    avatar: string;
    text: string;
    timestamp: string;
  }[];
}

export interface AcademicPathway {
  id: string;
  level: '10th' | '12th';
  category: 'Science' | 'Commerce' | 'Arts' | 'Vocational' | 'Engineering' | 'Medical' | 'Specialized';
  name: string;
  duration: string;
  eligibility: string;
  subjects: string[];
  estimatedFees: string;
  description: string;
  futureOpportunities: string[];
  higherEducationOptions: string[];
  careerOutcomes: string[];
  alumniInsights: AlumniInsight[];
  // Positions for interactive graph node positioning in percentages (e.g. x: 40, y: 50)
  nodePosition: {
    x: number;
    y: number;
  };
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface ChatThread {
  id: string; // Always dynamic
  alumniId: string;
  alumniName: string;
  alumniAvatar: string;
  alumniRole: string;
  messages: Message[];
}

export interface SavedPath {
  id: string;
  pathId: string;
  pathName: string;
  level: '10th' | '12th';
  savedAt: string;
}

export interface SavedAlumni {
  id: string;
  alumniId: string;
  alumniName: string;
  alumniRole: string;
  alumniAvatar: string;
  savedAt: string;
}

export interface AIRecommendationRequest {
  level: '10th' | '12th' | 'Graduation';
  interests: string[];
  strengths: string[];
  budget: 'low' | 'medium' | 'high' | 'any';
  durationPref: string;
  careerGoal: string;
}

export interface AIRecommendationResponse {
  recommendedPaths: {
    name: string;
    description: string;
    whyFits: string;
    estimatedFees: string;
    subjects: string[];
    timeline: string[];
    careerPotential: string[];
  }[];
  alternatives: {
    name: string;
    description: string;
    whyAlternative: string;
  }[];
  generalAdvice: string;
}
