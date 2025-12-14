# Guía de Desarrollo - TaskApp

## Introducción

Esta guía proporciona las mejores prácticas y estándares de desarrollo para contribuir al proyecto TaskApp. Siguiendo estas directrices, aseguramos código mantenible, testable y escalable.

## Entorno de Desarrollo

### Requisitos

- Node.js 18.0.0 o superior
- npm 8.0.0 o superior
- Angular CLI 20.0.0
- Capacitor CLI 8.0.0
- IDE recomendado: Visual Studio Code con extensiones de Angular

### Configuración Inicial

1. Clona el repositorio y instala dependencias:
   ```bash
   git clone <repository-url>
   cd TaskApp
   npm install
   ```

2. Instala Capacitor CLI globalmente:
   ```bash
   npm install -g @capacitor/cli
   ```

3. Verifica la instalación:
   ```bash
   ng version
   npx cap --version
   ```

## Estructura del Proyecto

```
TaskApp/
├── src/
│   ├── app/
│   │   ├── models/          # Interfaces TypeScript
│   │   ├── services/        # Lógica de negocio
│   │   ├── tabs/            # Navegación principal
│   │   └── [feature]/       # Módulos de funcionalidad
│   ├── assets/              # Recursos estáticos
│   ├── environments/        # Configuración por entorno
│   └── constants.ts         # Constantes globales
├── docs/                    # Documentación
├── capacitor.config.ts      # Configuración Capacitor
└── angular.json             # Configuración Angular
```

## Estándares de Código

### TypeScript

- Usa `strict` mode activado
- Define interfaces para todos los objetos de datos
- Evita `any`; usa tipos específicos
- Nombra interfaces con prefijo `I` opcional, pero consistente

```typescript
// ✅ Correcto
interface Task {
  id: string;
  title: string;
  completed: boolean;
}

// ❌ Incorrecto
interface task {
  id: any;
  title: string;
  completed: boolean;
}
```

### Angular

- Usa componentes standalone cuando sea posible
- Implementa `OnInit` y `OnDestroy` para lifecycle hooks
- Usa servicios para lógica de negocio, no componentes
- Aplica el patrón de inyección de dependencias

```typescript
// ✅ Componente standalone
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `...`
})
export class TaskListComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    // Inicialización
  }
}
```

### Ionic

- Usa componentes Ionic en lugar de HTML nativo
- Aplica el sistema de diseño de Ionic
- Optimiza para rendimiento móvil

## Patrones de Desarrollo

### Servicios

- Un servicio por responsabilidad
- Usa observables para datos asíncronos
- Implementa manejo de errores consistente

```typescript
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  async addTask(task: Omit<Task, 'id'>): Promise<Task> {
    try {
      const newTask = { ...task, id: this.generateId() };
      // Lógica de negocio
      this.tasksSubject.next([...this.tasks, newTask]);
      return newTask;
    } catch (error) {
      throw new Error(`Failed to add task: ${error.message}`);
    }
  }
}
```

### Gestión de Estado

- Usa BehaviorSubject para estado reactivo
- Evita mutación directa de arrays/objetos
- Implementa immutabilidad

```typescript
// ✅ Inmutable
updateTask(updatedTask: Task): void {
  const tasks = this.tasksSubject.value;
  const index = tasks.findIndex(t => t.id === updatedTask.id);
  if (index !== -1) {
    const newTasks = [...tasks];
    newTasks[index] = { ...updatedTask };
    this.tasksSubject.next(newTasks);
  }
}
```

### Manejo de Errores

- Usa try/catch en operaciones asíncronas
- Propaga errores con mensajes descriptivos
- Implementa logging para debugging

## Testing

### Estrategia de Testing

- Pruebas unitarias para servicios y utilidades
- Pruebas de integración para componentes
- Cobertura mínima del 80%

### Configuración de Pruebas

```typescript
// Ejemplo de prueba unitaria
describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should add a task', async () => {
    const task = await service.addTask({
      title: 'Test Task',
      description: 'Description',
      typeId: 'work'
    });

    expect(task.id).toBeDefined();
    expect(task.title).toBe('Test Task');
  });
});
```

### Ejecución de Pruebas

```bash
# Pruebas unitarias
ng test

# Pruebas con cobertura
ng test --code-coverage

# Pruebas de e2e (si implementadas)
ng e2e
```

## Linting y Formateo

### ESLint

- Ejecuta linting antes de commits
- Corrige automáticamente errores de estilo

```bash
ng lint
ng lint --fix
```

### Reglas Importantes

- Máximo 100 caracteres por línea
- Usa comillas simples para strings
- Punto y coma obligatorio
- Espacios en lugar de tabs (2 espacios)

## Control de Versiones

### Git Flow

- `main`: Rama de producción
- `develop`: Rama de desarrollo
- `feature/*`: Ramas de nuevas funcionalidades
- `bugfix/*`: Ramas de corrección de bugs

### Commits

- Usa mensajes descriptivos en inglés
- Prefija con tipo: `feat:`, `fix:`, `docs:`, `refactor:`

```bash
git commit -m "feat: add task completion functionality"
git commit -m "fix: resolve memory leak in task service"
```

## Despliegue

### Construcción para Producción

```bash
# Build Angular
ng build --configuration production

# Sincronizar con Capacitor
npx cap sync

# Construir APK/AAB
npx cap build android
```

### Versionado

- Sigue [Semantic Versioning](https://semver.org/)
- Actualiza `package.json` y `capacitor.config.ts`

## Capacitor y Plugins

### Gestión de Plugins

```bash
# Instalar plugin
npm install @capacitor/plugin-name
npx cap sync

# Actualizar plugins
npx cap update
```

### Configuración Nativa

- Modifica `capacitor.config.ts` para configuración global
- Edita archivos nativos en `android/` o `ios/` para personalizaciones específicas

## Rendimiento

### Optimizaciones

- Usa `trackBy` en `*ngFor`
- Implementa lazy loading de módulos
- Optimiza imágenes y assets
- Monitorea bundle size

```typescript
// trackBy para *ngFor
trackByTaskId(index: number, task: Task): string {
  return task.id;
}
```

### Auditorías

```bash
# Analizar bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

## Seguridad

### Mejores Prácticas

- Valida todas las entradas de usuario
- Usa HTTPS en producción
- Evita almacenar datos sensibles en localStorage
- Implementa Content Security Policy

## Troubleshooting

### Problemas Comunes

1. **Error de sincronización Capacitor**
   ```bash
   npx cap sync --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Problemas de build Android**
   - Verifica Android SDK instalado
   - Actualiza Gradle wrapper
   - Limpia proyecto en Android Studio

3. **Errores de TypeScript**
   - Ejecuta `ng build` para ver errores detallados
   - Verifica imports y tipos

## Recursos Adicionales

- [Documentación Angular](https://angular.io/docs)
- [Documentación Ionic](https://ionicframework.com/docs)
- [Documentación Capacitor](https://capacitorjs.com/docs)
- [Guías de TypeScript](https://www.typescriptlang.org/docs/)

Siguiendo esta guía, contribuiremos a mantener TaskApp como un proyecto de alta calidad y profesional.