class SparrestApi {
    // Variables para la url y los endpoints
    baseUrl = 'http://localhost:8000';
    endpoints = {
        login: '/auth/login',
        signup: '/auth/register',
        ads: '/api/ads',
    };

    // Constructor vacío
    constructor(){}

    // Creación del método get para obtener datos del servidor.
    async get(endpoint){
        const response = await fetch(`${this.baseUrl}${endpoint}`);

        if (!response.ok) {
            throw new Error('No existen resultados');
        }

        const data = await response.json();
        
        return data;
    }

    // Creación del método post para crear datos en el servidor
    async post(endpoint, body) {
      const token = localStorage.getItem('token');
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Ha habido un problema con la creación.');
      }
  
      const data = await response.json()
  
      return data;
    }


    // Creación del método delete para borrar datos en el servidor
    async delete(endpoint) {
        const token = localStorage.getItem('token')
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ha habido un problema con el borrado.');
        }
    
        const data = await response.json()
    
        return data;
      }

}

export const sparrestApi = new SparrestApi();