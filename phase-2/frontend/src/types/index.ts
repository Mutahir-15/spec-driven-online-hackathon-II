export enum Priority {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
}

export enum RecurrencePattern {
  DAILY = "Daily",
  WEEKLY = "Weekly",
}

export interface Tag {
  id: number;
  name: string;
  color?: string;
}

export interface Item {
  id: number;
  title: string;
  description?: string;
  is_completed: boolean;
  priority: Priority;
  due_date?: string;
  due_time?: string;
  is_recurring: boolean;
  recurrence_pattern?: RecurrencePattern;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
}