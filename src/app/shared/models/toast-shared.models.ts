export interface ITOAST_OBJECT {
  severity: TOAST_TYPE;
  summary: string;
  detail: string;
}

export type TOAST_TYPE = 'success' | 'error' | 'warn' | 'info';
