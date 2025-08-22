import { http, HttpResponse } from 'msw';
import {
  handlerBathroom,
  handlerBedroom,
  handlerLivingroom,
} from './handlersCategories';

export const handlers = [handlerBedroom, handlerBathroom, handlerLivingroom];
