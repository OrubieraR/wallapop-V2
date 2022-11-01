import { pubSub } from "../pub-sub/pubSub.js";
import { buildNotificationView } from "./notification-view.js";

export class NotificationController {
    constructor(nodeElement){
        this.notificationElement = nodeElement;
        this.subscribeToEvents();
    }

    subscribeToEvents(){
        pubSub.subscribe(pubSub.TOPICS.NOTIFICATION_ERROR, (message)=>{
            this.showNotification(message);
        });
    }

    showNotification(message){
        this.notificationElement.innerHTML = buildNotificationView(message);
        
        // Capturando la clase del botón.
        const closeButtonElement = this.notificationElement.querySelector('.close-notification');
        
        // Agregando event listener. Evento: click.
        closeButtonElement.addEventListener('click', ()=>{
            this.notificationElement.innerHTML = '';
        });
    }
}