import { CustomTaskType } from './app/models/task-type.model';

const STORAGE_KEY = 'task_types';

const DEFAULT_TASK_TYPES: CustomTaskType[] = [
  { id: 'work', name: 'Trabajo', icon: 'briefcase' },
  { id: 'home', name: 'Casa', icon: 'home' },
  { id: 'business', name: 'Negocios', icon: 'business' },
  { id: 'personal', name: 'Personal', icon: 'person' },
  { id: 'health', name: 'Salud', icon: 'heart' },
  { id: 'education', name: 'Educación', icon: 'school' },
  { id: 'shopping', name: 'Compras', icon: 'basket' },
  { id: 'travel', name: 'Viajes', icon: 'airplane' }
];

export { STORAGE_KEY, DEFAULT_TASK_TYPES };