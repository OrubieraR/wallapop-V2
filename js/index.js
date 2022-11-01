import { NotificationController } from "./notifications/notificationController.js";
import { AdsListController } from "./ads-list/ads-list-controller.js";




document.addEventListener('DOMContentLoaded', ()=>{

    const createControllers = () => {
        // Nodo anuncios ha capturar.
        const adListElement = document.querySelector('#ads-list');
        // Nodo notificaciones ha capturar.
        const notificationElement = document.querySelector('#notifications');

        // Invocación de controladores con los nodos como parámetro.
        const adsListController = new AdsListController(adListElement);
        const notificationController = new NotificationController(notificationElement);
    }

    const handleUserLogged = () => {
        const token = localStorage.getItem('token');
        const userActions = document.querySelector('#user-actions');
        // console.log(userActions);
        if (token) {
          userActions.innerHTML = '<a href="createAd.html">Crear anuncio</a>'
        } else {
          userActions.innerHTML = '<a href="signin.html">Inicia sesión</a><br><a href="signup.html">Crea un usario</a>'
        }
      }


    createControllers();
    handleUserLogged();
});