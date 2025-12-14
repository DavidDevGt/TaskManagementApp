# TaskApp

## Description

TaskApp es una aplicación híbrida desarrollada con Ionic Framework y Angular, diseñada para la gestión eficiente de tareas personales y profesionales. Utiliza Capacitor para proporcionar una experiencia nativa en dispositivos móviles, permitiendo la sincronización y almacenamiento local de tareas categorizadas.

La aplicación sigue principios de arquitectura limpia, con separación de responsabilidades entre la capa de presentación (Ionic/Angular), la lógica de negocio (servicios) y el almacenamiento (Capacitor Preferences).

## Tecnologías Utilizadas

- **Framework Frontend**: Angular 20 con Ionic 8
- **Lenguaje**: TypeScript 5.9
- **Plataforma Híbrida**: Capacitor 8
- **Estilos**: SCSS con Ionic Design System
- **Almacenamiento**: Capacitor Preferences (almacenamiento local nativo)
- **Herramientas de Desarrollo**: Angular CLI, ESLint, Karma/Jasmine para testing

## Características Principales

- Gestión completa de tareas: crear, editar, eliminar y marcar como completadas
- Categorización de tareas con tipos predefinidos (Trabajo, Casa, Negocios, Personal, Salud, Educación, Compras, Viajes)
- Interfaz de usuario intuitiva con navegación por pestañas
- Almacenamiento persistente local
- Soporte para plataformas iOS y Android
- Arquitectura modular y escalable

## Arquitectura del Sistema

La aplicación sigue una arquitectura basada en componentes modulares:

- **Presentación**: Componentes Ionic/Angular con patrón MVVM
- **Lógica de Negocio**: Servicios inyectables para gestión de estado y operaciones CRUD
- **Modelos de Datos**: Interfaces TypeScript para tipado fuerte
- **Almacenamiento**: Abstracción a través de Capacitor para persistencia local

Para más detalles, consulte la [documentación de arquitectura](docs/architecture.md).

## Requisitos del Sistema

- Node.js 18+
- npm o yarn
- Android Studio (para desarrollo Android)
- Xcode (para desarrollo iOS, en macOS)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd TaskApp
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Instala Capacitor CLI globalmente (si no está instalado):
   ```bash
   npm install -g @capacitor/cli
   ```

## Desarrollo

### Servidor de Desarrollo

Ejecuta `ng serve` para iniciar el servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente al modificar archivos fuente.

### Construcción

Ejecuta `ng build` para construir el proyecto. Los artefactos de construcción se almacenarán en el directorio `dist/`.

### Testing

Ejecuta `ng test` para ejecutar las pruebas unitarias con Karma.

### Linting

Ejecuta `ng lint` para verificar el código con ESLint.

## Despliegue en Dispositivos

### Android

1. Construye la aplicación:
   ```bash
   ng build --configuration production
   ```

2. Sincroniza con Capacitor:
   ```bash
   npx cap sync android
   ```

3. Abre en Android Studio:
   ```bash
   npx cap open android
   ```

### iOS

1. Construye la aplicación:
   ```bash
   ng build --configuration production
   ```

2. Sincroniza con Capacitor:
   ```bash
   npx cap sync ios
   ```

3. Abre en Xcode:
   ```bash
   npx cap open ios
   ```

## Guías de Desarrollo

Para información detallada sobre el desarrollo, patrones de código y mejores prácticas, consulta la [guía de desarrollo](docs/development-guide.md).

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Soporte

Para soporte técnico o preguntas, por favor contacta al equipo de desarrollo o abre un issue en el repositorio.
