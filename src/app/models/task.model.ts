import { CustomTaskType } from './task-type.model';

export interface Task {
    id: string;
    title: string;
    description: string;
    typeId: string;
    completed: boolean;
    createdAt: number;
}