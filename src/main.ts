import "reflect-metadata";

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import dayjs from "dayjs"
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrBefore)

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
