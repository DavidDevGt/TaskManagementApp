import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { refreshOutline, alertCircleOutline, checkmarkCircleOutline, filterOutline, checkmark, trash, checkmarkCircle, ellipseOutline, checkboxOutline, squareOutline, arrowUndoOutline, checkmarkDoneCircleOutline, documentTextOutline, bookmarkOutline, chatboxOutline, addCircleOutline } from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Add icons
addIcons({
  'refresh-outline': refreshOutline,
  'alert-circle-outline': alertCircleOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'filter-outline': filterOutline,
  'checkmark': checkmark,
  'trash': trash,
  'checkmark-circle': checkmarkCircle,
  'ellipse-outline': ellipseOutline,
  'checkbox-outline': checkboxOutline,
  'square-outline': squareOutline,
  'arrow-undo-outline': arrowUndoOutline,
  'checkmark-done-circle-outline': checkmarkDoneCircleOutline,
  'document-text-outline': documentTextOutline,
  'bookmark-outline': bookmarkOutline,
  'chatbox-outline': chatboxOutline,
  'add-circle-outline': addCircleOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
