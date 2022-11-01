export const buildAdView = (ad) => {
    // const formattedDate = new Date (ad.updatedAt);

    const adView = `
        <p>${ad.name}</p>
        <!--p>${ad.description}</p-->
        <p>${ad.price} €</p>
        <div>
            <img width="100" height="100" src="${ad.photo}" alt="Imagen de ${ad.name}">
        </div>
        <p>En venta: ${ad.sale}</p>
        
        <a type="button" href="./adDetail.html?id=${ad.id}">Ver anuncio completo</a>

        <hr><br><br>
    `;

    return adView;
}