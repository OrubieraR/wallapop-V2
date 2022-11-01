import { pubSub } from "../pub-sub/pubSub.js";
import { decodeToken } from "../utils/decodeToken.js"
import { getAdById, removeAdById } from "./ad-detail-provider.js";
import { buildAdDetail } from "./ad-detail-view.js";


export class AdDetailController {
    constructor(nodeElement){
        this.adDetailElement= nodeElement;
    }

    async drawAdDetail(adId) {
      try {
            const ad = await getAdById(adId);
            this.ad = ad;
            this.adDetailElement.innerHTML = buildAdDetail(ad);
            
            // Pintar botón de borrado si está logado y es su anuncio.
            this.drawRemoveButton();

            pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, 'Anuncio cargado correctamente.');
        } catch (error) {
            pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, 'Error obteniendo el anuncio');
            setTimeout(()=>{
              window.location.href = "./";
            },1500);
        }
    }

    drawRemoveButton() {
        // el usuario ha hecho login
        const token = localStorage.getItem('token');
    
        if (token) {
          // el usuario logado es el creador del anuncio q estamos viendo
          const tokenData = decodeToken(token);
          
          if (tokenData.userId === this.ad.userId) {
            const removeButton = this.adDetailElement.querySelector('button');
            removeButton.style.display = 'block';
            removeButton.addEventListener('click', () => this.removeAd())
          }
        }
        
      }
    
      async removeAd() {
        const response = window.confirm('¿Seguro que quieres borrar el anuncio?');
        if (response) {
          try {
            await removeAdById(this.ad.id);
            alert('Anuncio borrado exitosamente');
            window.location = '/';
          } catch (error) {
            // pubsub para mostrar notificación de error
            pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, 'Sucedió un error durante el borrado del anuncio');
          }
        }
      }
}

