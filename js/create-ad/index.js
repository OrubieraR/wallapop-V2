import {NotificationController} from "../notifications/notificationController.js"

import { pubSub } from "../pub-sub/pubSub.js"
import { CreateAdController } from "./createAdController.js"

document.addEventListener('DOMContentLoaded', () => {

  const checkUserLogged = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      document.querySelector('#create-ad-form').remove();
      pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, 'No estás autorizado a ver esta página.')
      setTimeout(() => {
        window.location = './'
      }, 2000);
    }
  }
  
  const notificationContainerElement = document.querySelector('.notification-container');
  const notificationController = new NotificationController(notificationContainerElement);
  
  const createAdElement = document.querySelector('#create-ad-form');
  const createAdController = new CreateAdController(createAdElement);
  // console.log(typeof createAdElement);
  checkUserLogged();

});
