import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption, IonButton, IonToast } from '@ionic/angular/standalone';
import { TaskService } from '../services/task.service';
import { CustomTaskType } from '../models/task-type.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption, IonButton, IonToast, ReactiveFormsModule],
})
export class Tab2Page implements OnInit {
  taskForm: FormGroup;
  taskTypes: CustomTaskType[] = [];
  showToast = false;
  toastMessage = '';

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      typeId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.taskTypes = this.taskService.getTaskTypes();
  }

  async onSubmit() {
    if (this.taskForm.valid) {
      try {
        await this.taskService.addTask({
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          typeId: this.taskForm.value.typeId,
          completed: false
        });
        this.toastMessage = 'Tarea creada exitosamente';
        this.showToast = true;
        this.taskForm.reset();
      } catch (error) {
        this.toastMessage = 'Error al crear la tarea';
        this.showToast = true;
      }
    }
  }
}
