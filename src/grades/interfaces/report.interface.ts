export interface BimesterMap {
  bimester: string;
  grades: number[];
}

export interface BimesterReporter {
  bimester: string;
  grades: number[];
  average: number;
}

export interface SubjectMap {
  subject: string;
  bimesters: Record<string, BimesterMap>;
}

export interface SubjectReport {
  subject: string;
  bimesters: BimesterReporter[];
  finalAverage: number;
}
