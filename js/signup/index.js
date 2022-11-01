import { SignupController } from "./signupController.js"
import { NotificationController } from "../notifications/notificationController.js"

document.addEventListener('DOMContentLoaded', () => {
  const createUserFormElement = document.querySelector('.create-user-form');
  const notificationElement = document.querySelector('#notification');
  
  const signupController = new SignupController(createUserFormElement);
  const notificationController = new NotificationController(notificationElement);
})