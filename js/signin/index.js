import { SigninController } from "./signinController.js"
import { NotificationController } from "../notifications/notificationController.js"

document.addEventListener('DOMContentLoaded', () => {
  const createUserFormElement = document.querySelector('.create-user-form');
  const notificationElement = document.querySelector('#notification');
  
  const signinController = new SigninController(createUserFormElement);
  const notificationController = new NotificationController(notificationElement);
})