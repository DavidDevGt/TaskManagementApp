import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { addIcons } from 'ionicons';
import { checkmark, trash } from 'ionicons/icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon],
})
export class Tab3Page implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private taskService: TaskService) {
    addIcons({ checkmark, trash });
  }

  ngOnInit() {
    this.subscription = this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async toggleComplete(task: Task) {
    task.completed = !task.completed;
    await this.taskService.updateTask(task);
  }

  async deleteTask(task: Task) {
    await this.taskService.deleteTask(task.id);
  }
}
