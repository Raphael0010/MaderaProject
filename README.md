# Projet Fil Rouge Madera

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## Démarrer le serveur 
❗️Lors d'une première installation il faut `yarn` pour installer les dépendances ❗️  
❗️TOUJOURS SE PLACER DANS LA RACINE DU DOSSIER❗️  
1️⃣ On écrit dans le terminal `yarn start` pour démarrer Angular  
2️⃣ Ensuite dans un autre terminal il faut démarrer l'api comme ça `yarn api`  

L'application se lance ici `http://localhost:4200/`   
L'api démarre sur le port 3000

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
│   └── shared ➡️ Dossier des composants reutilisables (navbar)
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

## Configuration de l'API pour la base de données

Il faut dupliquer le `.env.local` en `.env` et le remplir comme ça :
```
USER=user
PASS=pass
HOST=127.0.0.1
PORT=3306
BDD=nombasededonnee
```

## Utilisation de l'API 

`app.get()` est utilisée pour les appels GET et `app.post()` pour les appels POST  
L'objet req contient toute les données envoyées ou non par Angular 
( utile si on doit récupérer des paramètres )  
`res.send` permet de retourner une réponse

Dans l'exemple si dessous nous allons crée notre route /test   
qui nous renvoie le contenu de notre requête
➡️ Le résultat sera PARSE en JSON sur notre API

```js
app.get('/test', function (req, res) {
  sequelize.query("SELECT * FROM `table`", { type: sequelize.QueryTypes.SELECT})
  .then(users => {
    res.send(users)
  })
  ;
})
```

Exemples d'utilisation basiques des méthodes GET et POST
```js
app.get('/testGet', (req,res) => {
  console.log("Handle Get Request", req.query);
  // Pour afficher l'id
  console.log(req.query.id);
  // Je renvoie le code 200
  res.send(JSON.parse("{\"code\":200}"))
});

app.post('/testPost', (req,res) => {
  console.log("Handle Post Request", req.body);
  // Pour afficher l'age
  console.log(req.body.age);
  // Je renvoie ce que j'ai reçu
  res.send(req.body);
});
```

## Appel de l'API

❗️Attention nous utiliserons 2 méthodes GET/POST ❗️  

Pour appeler la route de votre API vous devez le faire ainsi :
```ts
await callApiFree("/testPost", "POST", data);
```

❗️Attention pour utiliser await vous devez être dans une méthode async ❗️
Par exemple :
```ts
async function test() {
  await callApiFree("/testPost", "POST", data);
}
```

❔Await permet d'éviter d'utiliser les callback (.then, etc) 

## Utilisation de CallApiFree
```ts
await callApiFree("/route","METHODE",data?);
```
❗️Le paramètre ``data`` est optionnel ❗️  
Si nous utilisons GET nous passerons nos données comme ça:

```ts
await callApiFree(`/testGet?id=${3 + 3}`, "GET");
```

❔`/route${4+3}` , L'utilisation de ${} et des backticks permet d'écrire du code TS dans une string


# Divers 🎓

## Créer les routes de vos composants 

Pour créer les routes de vos composants vous devez vous rendre dans ``src/app/app-routing.module.ts``

```ts
const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];
```
Dans l'exemple ci dessus le path ``login`` va diriger vers le ``LoginComponent``  
Si on met aucun URL on sera redirigé vers login  
Si l'url ne correspond à aucune entrée du tableau alors on redirige vers ``PageNotFoundComponent``

## Organisation du GitHub

❗️Pour chaque partie que vous développerez vous devrez créer une branch    
Une fois votre développement terminé vous ferez une pull request sur github  
Pour les commit veuillez suivre les [normes Karma](http://karma-runner.github.io/4.0/dev/git-commit-msg.html) ❗️

## Faire une pull request 🎁

* Pour maintenir son fork à jour : [ici](https://gist.github.com/CristinaSolana/1885435)

* Forker le projet sur GitHub  
* Créer une branche et travailler dessus  
* Publier la branche sur son fork  
* Créer la pull-request sur GitHub
