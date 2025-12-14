# Referencia de API - TaskApp

## Visión General

TaskApp utiliza una arquitectura de servicios locales para la gestión de datos. Esta referencia documenta las interfaces públicas y métodos disponibles para interactuar con la funcionalidad de la aplicación.

## Modelos de Datos

### Task

Representa una tarea individual en el sistema.

```typescript
interface Task {
  id: string;              // Identificador único generado automáticamente
  title: string;           // Título de la tarea (obligatorio)
  description: string;     // Descripción detallada (opcional)
  typeId: string;          // ID del tipo de tarea (referencia a CustomTaskType)
  completed: boolean;      // Estado de completitud
  createdAt: number;       // Timestamp de creación (milisegundos desde epoch)
}
```

### CustomTaskType

Define los tipos o categorías disponibles para las tareas.

```typescript
interface CustomTaskType {
  id: string;        // Identificador único del tipo
  name: string;      // Nombre legible del tipo
  icon?: string;     // Icono opcional (usando Ionicons)
}
```

## TaskService

Servicio principal para la gestión de tareas. Implementa el patrón Singleton a través de Angular DI.

### Propiedades Públicas

#### `tasks$`
```typescript
public tasks$: Observable<Task[]>
```
Observable que emite la lista completa de tareas cada vez que hay cambios.

**Uso:**
```typescript
constructor(private taskService: TaskService) {}

ngOnInit() {
  this.taskService.tasks$.subscribe(tasks => {
    console.log('Tareas actualizadas:', tasks);
  });
}
```

### Métodos Públicos

#### `getTasks()`
```typescript
async getTasks(): Promise<Task[]>
```

Obtiene todas las tareas almacenadas.

**Retorno:** `Promise<Task[]>` - Lista completa de tareas

**Uso:**
```typescript
const tasks = await this.taskService.getTasks();
```

#### `addTask(task)`
```typescript
async addTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task>
```

Crea una nueva tarea con ID y timestamp generados automáticamente.

**Parámetros:**
- `task: Omit<Task, 'id' | 'createdAt'>` - Datos de la nueva tarea

**Retorno:** `Promise<Task>` - La tarea creada con ID asignado

**Uso:**
```typescript
const newTask = await this.taskService.addTask({
  title: 'Nueva tarea',
  description: 'Descripción opcional',
  typeId: 'work',
  completed: false
});
```

#### `updateTask(updatedTask)`
```typescript
async updateTask(updatedTask: Task): Promise<void>
```

Actualiza una tarea existente.

**Parámetros:**
- `updatedTask: Task` - Tarea con los datos actualizados

**Retorno:** `Promise<void>`

**Lanza:** Error si la tarea no existe

**Uso:**
```typescript
await this.taskService.updateTask({
  id: 'task-123',
  title: 'Título actualizado',
  description: 'Nueva descripción',
  typeId: 'personal',
  completed: true,
  createdAt: 1234567890
});
```

#### `deleteTask(taskId)`
```typescript
async deleteTask(taskId: string): Promise<void>
```

Elimina una tarea por su ID.

**Parámetros:**
- `taskId: string` - ID de la tarea a eliminar

**Retorno:** `Promise<void>`

**Uso:**
```typescript
await this.taskService.deleteTask('task-123');
```

#### `getTaskTypes()`
```typescript
getTaskTypes(): CustomTaskType[]
```

Obtiene la lista de tipos de tarea disponibles.

**Retorno:** `CustomTaskType[]` - Lista de tipos predefinidos

**Uso:**
```typescript
const types = this.taskService.getTaskTypes();
// Retorna: [{ id: 'work', name: 'Trabajo', icon: 'briefcase' }, ...]
```

## Constantes Globales

### `DEFAULT_TASK_TYPES`
```typescript
const DEFAULT_TASK_TYPES: CustomTaskType[]
```

Lista predefinida de tipos de tarea disponibles en la aplicación.

**Valores:**
- `work` - Trabajo
- `home` - Casa
- `business` - Negocios
- `personal` - Personal
- `health` - Salud
- `education` - Educación
- `shopping` - Compras
- `travel` - Viajes

### `STORAGE_KEY`
```typescript
const STORAGE_KEY = 'task_types'
```

Clave utilizada para el almacenamiento persistente de tareas en Capacitor Preferences.

## Manejo de Errores

El servicio implementa manejo de errores consistente:

- **Validación de entrada**: Verifica que los datos requeridos estén presentes
- **Errores de almacenamiento**: Maneja fallos en la persistencia de datos
- **IDs no encontrados**: Lanza errores cuando se intenta actualizar/eliminar tareas inexistentes

## Patrones de Uso Recomendados

### Suscripción Reactiva
```typescript
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private destroy$ = new Subject<void>();

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Operaciones Asíncronas
```typescript
async createTask() {
  try {
    const task = await this.taskService.addTask({
      title: this.title,
      description: this.description,
      typeId: this.selectedType,
      completed: false
    });
    console.log('Tarea creada:', task);
  } catch (error) {
    console.error('Error al crear tarea:', error);
  }
}
```

### Filtrado y Búsqueda
```typescript
getPendingTasks(): Task[] {
  return this.tasks.filter(task => !task.completed);
}

getTasksByType(typeId: string): Task[] {
  return this.tasks.filter(task => task.typeId === typeId);
}
```

## Consideraciones de Rendimiento

- **Persistencia automática**: Todas las operaciones se guardan inmediatamente
- **Notificaciones reactivas**: Los cambios se propagan automáticamente a todos los suscriptores
- **Inmutabilidad**: Las operaciones no mutan arrays existentes, creando nuevas instancias
- **Generación de IDs**: IDs únicos generados usando timestamp + random para evitar colisiones

## Extensibilidad

La API está diseñada para ser extensible:

- Nuevos tipos de tarea pueden agregarse a `DEFAULT_TASK_TYPES`
- Métodos adicionales pueden implementarse siguiendo el patrón existente
- La interfaz `Task` puede extenderse con nuevos campos sin romper compatibilidad
- Servicios adicionales pueden inyectarse para funcionalidades específicas

## Versionado

Esta documentación corresponde a la versión 0.0.1 de TaskApp. Las interfaces públicas se mantendrán compatibles hacia atrás en versiones menores.