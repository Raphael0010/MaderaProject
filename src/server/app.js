const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const Sequelize = require('sequelize');
// Attention à bien configurer l'url de connexion à la base de données
const sequelize = new Sequelize('mariadb://root:root@127.0.0.1:3306/madera',
  {
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT+1',
    }
  }
);

app.use(cors());
app.options('*', cors());  // enable pre-flight
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// On crée notre route /test qui nous renvoie "Hello World" en json
app.get('/testBDD', function (req, res) {
  sequelize.query("SELECT * FROM `apprenants`", { type: sequelize.QueryTypes.SELECT})
  .then(users => {
    res.send(JSON.stringify(users))
  });
})


app.get("/listDevis", (req,res) => {
  sequelize.query("SELECT id_devis as id, CONCAT(nom,' ',prenom) as client, etat_devis as etat FROM devis INNER JOIN client on devis.id_client = client.id_cli", { type: sequelize.QueryTypes.SELECT})
  .then(users => {
    res.send(JSON.stringify(users))
  });
})

app.get("/deleteDevis/:id", (req,res) => {
  sequelize.query(`DELETE FROM devis WHERE id_devis = ${req.params.id}`)
  .then(e=>{
    res.send(JSON.parse("{\"code\":200}"))
  });
})


app.get('/testGet', (req,res) => {
  console.log("Handle Get Request", req.query);
   // Pour affiche l'id
   console.log(req.query.id);
  // Je renvoie code 200
  res.send(JSON.parse("{\"code\":200}"))
});

app.post('/testPost', (req,res) => {
  console.log("Handle Post Request", req.body);
  // Pour affiche l'age
  console.log(req.body.age);
  // Je renvoie ce qu'on ma envoyer
  res.send(req.body);
});

// Notre app écoute sur le port 3000 donc pour intérroger notre api on call ici : localhost:3000
app.listen(3000, function () {
  console.log('Server start on port 3000!');
})
