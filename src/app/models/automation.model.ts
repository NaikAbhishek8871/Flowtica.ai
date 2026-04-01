 export interface Automation {
  id?: number;
  triggerType: string;
  keyword: string;
  messageType: string;
  message: string;
  delay: number;
  status: 'Active' | 'Paused';
  leads: number;
  createdAt?: Date;
}