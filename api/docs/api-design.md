
**Pagina web para veganos**

En esta pagina el usuario podrá compartir sitios veganos y compartirlos para hacer una network donde estas personas puedan visitar el sitio, y dependiendo de la ciudad donde esté haya una lista actualizada de sitios donde poder comer.
Dado la poca visibilidad que tienen.

**Historias de usuarios**

-El usuario puede registrarse y acceder a las ventajas de compartir sitios
-Un usuario anónimo que no esté registrado podrá acceder a ver los sitios y las localizaciones pero no podrán crear entradas
-El administrador puede eliminar una localización que no vea apropiada según el contenido
- El usuario podrá buscar localizaciones por ciudad
- El usuario podrá ver un mapa con los sitios con más likes (destacados ) de cada lugar
- Un usuario registrado puede compartir por redes 
- un usuario podrá dar like a una localización

-El navbar tiene diferentes opciones, una de ellas son las paginas por las que podrás navegar, como ciudades, y una lista de sitios por cada una de ellas.
-Un buscador, en este buscador un usuario podrá buscar una ciudad (la que desee) y obtendrá una lista de sitios a los que ir.
-Homepage será una ilustración mas los sitios destacados de cada lugar, mostrados en vistas de imágenes y su localización.



**Diseño API**

```js
POST /login
POST/register

GET /places ==public==
GET /places/:placesId ==public==

GET/places?search=random ==public== 

POST /places ==admin== (form)
PUT /places/:placesId ==admin== 
DELETE /places/:placesId ==admin==

GET /users/favorites/totalFavorites ==user==
PUT/users/favorites ==user==

GET /users/favorites/totalFavorites ==admin==
PUT/users/favorites ==admin==

GET /comments ==admin==
POST /commments ==admin== 
PUT /comments/:commentId ==admin== 
DELETE /comment/:commentId ==admin==

GET /comments ==user==
POST /commments ==user== 
PUT /comment/:commentId ==user== 
```

**Modelo de datos
Places**

```js
	name: { type: String, required: true },
	location: { type: String, required: true },
	description: { type: String, required: true },
	city: { type: String, required: true },
	Likes: [{ type: mongoose.ObjectId, ref: 'User' }],
```

**Modelo de datos
Users**

```js
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	isAdmin: Boolean,
```

**Modelo de datos
reseñas**

```js
  comment: { type: String, required: true },
  date: { type: Date, required: true },
  userId: { type: mongoose.ObjectId, ref: "User", required: true },
  moderate: Boolean,
```

