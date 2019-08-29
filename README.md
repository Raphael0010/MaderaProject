# Projet Fil Rouge Madera

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## Démarrer le serveur 

❇️On se place dans le dossier du projet et on écrit  `ng serve`.   
L'application se lance ici `http://localhost:4200/`.   


## Créer un composant 

* On se place dans le dossier du projet
* On lance cette commande :   
`ng generate component components/NomDuComposant`

❗️ Attention, il faut écrire le nom du composant en 🐫CamelCase ❗️

Exemple : `ng generate component components/DevisAccueil`

## Organisation de l'architecture 🗂

```
├── app    
│   ├── app-routing.module.ts        ➡️ Gestion des routes
│   ├── app.component.css  
│   ├── app.component.html   
│   ├── app.component.spec.ts  
│   ├── app.component.ts  
│   ├── app.module.ts  
│   ├── components                   ➡️ Dossier des composants
│   │   ├── login                    ➡️ Composant Login
│   │   │   ├── login.component.css    
│   │   │   ├── login.component.html  
│   │   │   ├── login.component.spec.ts  
│   │   │   └── login.component.ts  
│   │   └── page-not-found           ➡️ Composant PageNotFound
│   ├── core   ➡️ Dossier des methodes core (📥api call)
│   └── shared ➡️ Dossier des composants reutilisable (navbar)
├── assets  
│   └── img  
├── environments  
│   ├── environment.prod.ts  
│   └── environment.ts  
├── favicon.ico  
├── index.html  
├── main.ts  
├── polyfills.ts  
├── server  
│   └── app.js ➡️ 📥 API BDD ↔️ Angular
├── styles.css  
└── test.ts  
```
# API 📥

## Configuration de l'API 

```js
const sequelize = new Sequelize('mariadb://root:root@127.0.0.1:3306/pfr',
  {
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT+1',
    }
  }
);
```

Il faut créer la base de donnée et configurer l'url de connexion comme cela :
`mariadb://USER:PASS@127.0.0.1:3306/NOMBASE`


## Utilisation de l'API 

* On crée notre route /test qui nous renvoie "Hello World" en json   
❗️ Il faut impérativement renvoyer en JSON en utilisant `JSON.stringify();` ❗️   
`app.get()` est utilisé pour les appels GET et `app.post()` pour les appels POST  
L'objet req contient toute les données envoyer ou non par Angular 
( utile si on doit récupérer des paramètres )  
`res.send` permet de retourner une réponse

```js
app.get('/test', function (req, res) {
  sequelize.query("SELECT * FROM `table`", { type: sequelize.QueryTypes.SELECT})
  .then(users => {
    res.send(JSON.stringify(users))
  })
  ;
})
```

## Appel de l'API

