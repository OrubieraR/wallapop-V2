import { NotificationController } from "../notifications/notificationController.js";
import { AdDetailController } from "./ad-detail-controller.js";

document.addEventListener('DOMContentLoaded', ()=>{
    const adDetailContainerElement = document.querySelector('#ads-details');

    const notificationContainerElement = document.querySelector('#notifications');

    const params = new URLSearchParams(location.search);
    const adId = params.get('id');
    console.log(adId);

    const adDetailController = new AdDetailController(adDetailContainerElement);
    adDetailController.drawAdDetail(adId);

    const notificationController = new NotificationController(notificationContainerElement);

});