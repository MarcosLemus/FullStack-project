# ANALISIS Y DISEÑO REQUISITOS PARA EL BACKEND

## WIREFRAME - SITEMAP

## DATOS (Colecciones, schema, relaciones)

### Colecciones

- users
- countries

### Schema

```javascript
// users collection

{
  "username": "user1", // required, unique
  "password": "dc1124", // required
  "isAdmin": true // optional
}

// coutries collection

{
  "name": "Belgium", // required, unique
  "population": 124521, // required
  "region": "Europe" // required
  "capital": "Brussels" // required
  "nativeName": "België" // required,
  "subregion": "Western Europe" // optional
  "topLevelDomain": [".be"] // optional
  "currencies": ["Euro"] // required
  "laguages": ["Dutch", "French", "German"] // required
  "flag": "flag.png", //required
  "flagCloudinaryId": "125123",
  "borders":  ["France", "Germany", "Netherlands"] // RELATION: [{countryId}]
}
```

### Relaciones

- "borders": countries with countries [{countryId}]

## DISEÑO DE LA API (ENDPOINTS, PARAMS, AUTH)

POST /api/users/signup {public}
`[BODY] username, password`

POST /api/users/signin {public}
`[BODY] username, password`

GET /api/countries {public}
GET /api/countries?region=africa {public}
GET /api/countries?search=bel {public}
GET /api/countries?limit=20&offset=20 {public}
`[QUERY] region`
`[QUERY] search`
`[QUERY] limit, offset`

GET /api/countries/:countryId {public}
`[PARAM] countryid`

POST /api/countries {auth}
`[BODY] name, populationo, region, capital, nativeName, subregion*, topLevelDomain*, currencies, languages, borders`
`[BODY MULTIPART] flag`

PUT /api/countries/:countryId {auth}
`[PARAM] countryid`
`[BODY] name, populationo, region, capital, nativeName, subregion*, topLevelDomain*, currencies, languages, borders`
`[BODY MULTIPART] flag`

DELETE /api/countries/:countryId {auth admin}
`[PARAM] countryid`
