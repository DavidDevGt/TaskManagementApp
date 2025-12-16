import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaskService } from '../services/task.service';
import { CustomTaskType } from '../models/task-type.model';
import { addIcons } from 'ionicons';
import { refreshOutline, documentTextOutline, bookmarkOutline, chatboxOutline, addCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule
  ],
})
export class Tab2Page implements OnInit {
  taskForm: FormGroup;
  taskTypes: CustomTaskType[] = [];
  showToast = false;
  toastMessage = '';

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    addIcons({ refreshOutline, documentTextOutline, bookmarkOutline, chatboxOutline, addCircleOutline });
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      typeId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.taskTypes = this.taskService.getTaskTypes();
  }

  resetForm() {
    this.taskForm.reset();
    this.taskForm.get('typeId')?.setValue(''); // Asegura que el select se resetee visualmente
  }

  trackByType(index: number, type: CustomTaskType): string {
    return type.id;
  }

  async onSubmit() {
    if (this.taskForm.valid) {
      try {
        const selectedType = this.taskTypes.find(t => t.id === this.taskForm.value.typeId);
        await this.taskService.addTask({
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          typeId: this.taskForm.value.typeId,
          typeName: selectedType ? selectedType.name : '',
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
