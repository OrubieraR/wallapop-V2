export const buildAdDetail = (ad) => {
  
    // const updatedAt = new Date(ad.updatedAt);
    return `
    <p>Nombre:<br>${ad.name}</p>
    <p>Descripción:<br>${ad.description}</p>
    <p>Precio:<br>${ad.price} €</p>
    <div>
        <img width="300" height="300" src="${ad.photo}" alt="Imagen de ${ad.name}">
    </div>
    <p>Estado: ${ad.sale ? 'En venta.' : 'Se busca para comprar.'}</p>
      
    <button style="display: none">Borrar Anuncio</button>
    `;
    // return `
    //   <p>${JSON.stringify(ad)}</p>
    // `;
  }