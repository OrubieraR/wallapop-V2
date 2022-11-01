export const buildNotificationView = (message) =>{
    return `
        <p>${message}</p>
        <button class="close-notification">Cerrar</button>
    `;
}