import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent],
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
}
