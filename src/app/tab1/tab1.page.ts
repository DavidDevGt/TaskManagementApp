import { Component, OnInit, OnDestroy, signal, ChangeDetectionStrategy } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonProgressBar, IonCardSubtitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonProgressBar,
    IonCardSubtitle,
    CommonModule
  ],
})
export class Tab1Page implements OnInit, OnDestroy {
  pendingTasks = signal(0);
  completedTasks = signal(0);
  private subscription: Subscription = new Subscription();

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.subscription = this.taskService.tasks$.subscribe(tasks => {
      this.pendingTasks.set(tasks.filter(t => !t.completed).length);
      this.completedTasks.set(tasks.filter(t => t.completed).length);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshData() {
    // Recargar datos del servicio
    this.taskService.getTasks().then(tasks => {
      // Actualizar señales si es necesario
    });
  }

  completionPercentage(): number {
    const total = this.pendingTasks() + this.completedTasks();
    return total > 0 ? Math.round((this.completedTasks() / total) * 100) : 0;
  }

  totalTasks(): number {
    return this.pendingTasks() + this.completedTasks();
  }
}
