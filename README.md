# api-backend-meli

Api que consume de la api de mercado libre, resultados de productos y detalles de producto 
Se encuentra disponible para su utilización en el siguiente enlace [API-MELI](https://api-backend-meli.vercel.app/api/v1/items)

Url para obtener resultados de productos:
```javascript
https://api-backend-meli.vercel.app/api/v1/items?q=casas
```
Url para obtener detalle de producto:
```javascript
https://api-backend-meli.vercel.app/api/v1/items/MLA1439921006
```

Para correr la API en local se debe clonar el proyecto en un repo local y levantarlo en modo dev

```bash
git clone git@github.com:martinlud136/api-backend-meli.git
cd api-backend-meli
npm run dev
```
