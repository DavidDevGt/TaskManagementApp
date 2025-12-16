import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonContent, ViewWillEnter } from '@ionic/angular';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { addIcons } from 'ionicons';
import { checkmark, trash, checkmarkCircle, ellipseOutline, checkboxOutline, squareOutline } from 'ionicons/icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    CommonModule
  ],
})
export class Tab3Page implements ViewWillEnter {
  @ViewChild(IonContent) content!: IonContent;
  tasks$: Observable<Task[]> = this.taskService.tasks$;

  constructor(private taskService: TaskService) {
    addIcons({ checkmark, trash, checkmarkCircle, ellipseOutline, checkboxOutline, squareOutline });
  }

  ionViewWillEnter() {
    if (this.content) {
      this.content.scrollToTop(0);
    }
  }

  openFilterModal() {
    console.log('Abriendo modal de filtro...');
    // Lógica para presentar un modal
  }

  viewTaskDetails(task: Task) {
    console.log('Ver detalles de la tarea:', task.title);
    // Lógica de navegación
  }

  async toggleComplete(task: Task) {
    task.completed = !task.completed;
    await this.taskService.updateTask(task);
  }

  async deleteTask(task: Task) {
    await this.taskService.deleteTask(task.id);
  }

  editTask(task: Task) {
    console.log('Editando tarea:', task.title);
    // Lógica de edición
  }

  trackByTask(index: number, task: Task): string {
    return task.id;
  }
}
