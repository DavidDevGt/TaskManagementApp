# Arquitectura de TaskApp

## Visión General

TaskApp está diseñado siguiendo principios de arquitectura limpia y modularidad, inspirados en las mejores prácticas de desarrollo de software empresarial. La aplicación separa claramente las responsabilidades en capas distintas, facilitando el mantenimiento, testing y escalabilidad futura.

## Principios Arquitectónicos

- **Separación de Responsabilidades**: Cada componente tiene una única responsabilidad bien definida.
- **Inyección de Dependencias**: Uso de Angular DI para desacoplar componentes.
- **Programación Reactiva**: Empleo de RxJS para manejo de estado asíncrono.
- **Tipado Fuerte**: TypeScript para prevenir errores en tiempo de compilación.
- **Persistencia Abstraída**: Capa de almacenamiento independiente de la implementación.

## Diagrama de Arquitectura

```
┌─────────────────┐
│   Presentation  │  ← Ionic Components (UI)
│     Layer       │
├─────────────────┤
│ Business Logic  │  ← Angular Services
│     Layer       │
├─────────────────┤
│   Data Layer    │  ← Models & Interfaces
├─────────────────┤
│ Persistence     │  ← Capacitor Preferences
│     Layer       │
└─────────────────┘
```

## Capas de la Arquitectura

### 1. Capa de Presentación (Presentation Layer)

**Responsabilidades:**
- Renderizado de la interfaz de usuario
- Manejo de interacciones del usuario
- Navegación entre vistas

**Tecnologías:**
- Ionic Framework para componentes UI
- Angular para lógica de componentes
- SCSS para estilos

**Estructura:**
```
src/app/
├── tabs/           # Navegación principal
├── tab1/           # Vista de tareas
├── tab2/           # Vista de categorías
├── tab3/           # Configuración
└── app.component.* # Componente raíz
```

### 2. Capa de Lógica de Negocio (Business Logic Layer)

**Responsabilidades:**
- Validación de reglas de negocio
- Coordinación de operaciones CRUD
- Gestión de estado de la aplicación

**Patrones Implementados:**
- **Service Layer Pattern**: Servicios centralizan la lógica de negocio
- **Observer Pattern**: BehaviorSubject para notificaciones reactivas
- **Repository Pattern**: Abstracción del acceso a datos

**Componentes Clave:**
- `TaskService`: Gestiona operaciones de tareas
- Gestión de tipos de tarea predefinidos
- Validación de datos de entrada

### 3. Capa de Datos (Data Layer)

**Responsabilidades:**
- Definición de estructuras de datos
- Validación de tipos
- Contratos de interfaz

**Modelos:**
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  typeId: string;
  completed: boolean;
  createdAt: number;
}

interface CustomTaskType {
  id: string;
  name: string;
  icon?: string;
}
```

### 4. Capa de Persistencia (Persistence Layer)

**Responsabilidades:**
- Almacenamiento y recuperación de datos
- Abstracción del mecanismo de almacenamiento

**Implementación:**
- Capacitor Preferences para almacenamiento clave-valor nativo
- Serialización JSON para objetos complejos
- Manejo asíncrono con Promises

## Patrones de Diseño Implementados

### Patrón MVVM (Model-View-ViewModel)

- **Model**: Interfaces TypeScript (`Task`, `CustomTaskType`)
- **View**: Templates Ionic/Angular
- **ViewModel**: Componentes Angular con lógica de presentación

### Patrón Singleton

- Servicios inyectados como singletons a través de Angular DI
- Garantiza instancia única del `TaskService`

### Patrón Observer

- `BehaviorSubject` para notificaciones reactivas de cambios en tareas
- Suscripción automática en componentes para actualización de UI

## Flujo de Datos

1. **Usuario interactúa** → Componente de presentación
2. **Componente** → Llama a método del servicio
3. **Servicio** → Valida y procesa lógica de negocio
4. **Servicio** → Persiste cambios vía Capacitor
5. **Servicio** → Emite notificación vía BehaviorSubject
6. **Componente** → Actualiza UI reactivamente

## Consideraciones de Escalabilidad

### Extensibilidad

- Nuevos tipos de tarea pueden agregarse fácilmente en `constants.ts`
- Servicios adicionales pueden inyectarse sin modificar componentes existentes
- Plugins de Capacitor pueden integrarse para funcionalidades nativas avanzadas

### Mantenibilidad

- Código modular facilita pruebas unitarias
- Separación de capas permite cambios independientes
- TypeScript previene errores comunes

### Rendimiento

- Lazy loading de componentes Ionic
- Almacenamiento local minimiza llamadas de red
- RxJS optimiza manejo de eventos asíncronos

## Decisiones Arquitectónicas

### Elección de Capacitor sobre Cordova

- Mejor integración con Angular/Ionic moderno
- API más consistente y mantenida
- Soporte nativo superior para plugins

### Uso de Preferences sobre SQLite

- Simplicidad para datos estructurados simples
- No requiere configuración de base de datos
- Suficiente para requisitos actuales de persistencia

### Patrón de Navegación por Pestañas

- Experiencia familiar para usuarios móviles
- Separación lógica de funcionalidades
- Fácil expansión con nuevas pestañas

## Próximas Evoluciones Arquitectónicas

- **Backend Integration**: API REST para sincronización en la nube
- **State Management**: NgRx para estado global complejo
- **Offline-First**: IndexedDB para mayor capacidad de almacenamiento
- **Microfrontends**: Desacoplamiento de módulos para equipos independientes

Esta arquitectura proporciona una base sólida para el crecimiento de TaskApp, manteniendo la simplicidad mientras permite extensiones futuras de manera controlada.