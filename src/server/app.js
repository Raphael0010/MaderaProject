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
/*const Projet = sequelize.import('../app/models/projet.js') ;

const Client = sequelize.define('client', 
  {
    id_cli: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nom: {
      type: Sequelize.STRING
    },
    prenom: {
      type: Sequelize.STRING
    },
    mail: {
      type: Sequelize.STRING
    },
    tel: {
      type: Sequelize.STRING
    },
    newsletter: {
      type: Sequelize.STRING
    }
  },
  {
      freezeTableName: true,
      timestamps: false
});

Projet.belongsTo(Client) ;
Client.hasMany(Projet) ;*/


app.use(cors());
app.options('*', cors());  // enable pre-flight
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/client", (req,res) => {
  sequelize.query("SELECT id_cli, nom AS nomClient, client.prenom AS prenomClient FROM client", 
  { type: sequelize.QueryTypes.SELECT})
  .then(clients => {
    res.send(JSON.stringify(clients))
  });
}) ;

                      // ------ Projet ----------
app.get("/projet", (req,res) => {
  sequelize.query("SELECT id_projet AS id, nom_projet AS nom, client.nom AS nomClient, client.prenom AS prenomClient, creation AS dateCreation, id_comm AS idComm, id_client AS idClient FROM projet INNER JOIN client ON projet.id_client = client.id_cli", 
  { type: sequelize.QueryTypes.SELECT})
  .then(projets => {
    res.send(JSON.stringify(projets))
  });
}) ;

app.post("/projet", (req,res) => {
  sequelize.query("INSERT INTO projet (nom_projet, creation, id_comm, id_client) VALUES (:projet, :date, :comm, :client)", 
  {replacements: {projet: req.body.nom, date: new Date(req.body.date), client: req.body.client, comm: 1}
  })
  .then(projets => {
    res.send(JSON.stringify(projets))
  });
}) ;

app.post("/edit/projet", (req,res) => {
  sequelize.query("UPDATE projet SET nom_projet = :projet, creation = :date, id_comm = :comm, id_client = :client WHERE id_projet = :id", 
  {replacements: {id: req.body.id, projet: req.body.nom, date: new Date(req.body.date), client: req.body.client, comm: 1}
  })
  .then(projets => {
    res.send(JSON.stringify(projets))
  });
}) ;

app.post("/delete/projet", (req,res) => {
  sequelize.query("DELETE FROM projet WHERE id_projet = :id", 
  {replacements: {id: req.body.id}
  })
  .then(projets => {
    res.send(JSON.stringify(projets))
  });
}) ;

//                           ------------------


                            // ------ Plan ----------

app.get("/plan/:id", (req,res) => {
  //const id = parseInt(req.params.id, 10) ;
  sequelize.query(`SELECT id_plan AS id, creation AS dateCreation, nb_piece AS nbPieces, nb_chambre AS nbChambres, nb_etage AS nbEtage, surface, id_devis AS idDevis, id_projet AS idProjet FROM plan WHERE id_projet = ${req.params.id}`,
  { type: sequelize.QueryTypes.SELECT}) 
  .then(plan => {
    console.log(plan) ;
    res.send(JSON.stringify(plan)) ;
  });
}) ;

app.post("/plan/:id", (req,res) => {
  const id = parseInt(req.params.id, 10) ;
  sequelize.query("INSERT INTO plan (creation, nb_piece, nb_chambre, nb_etage, surface, id_projet) VALUES (:date, :nbPiece, :nbChambre, :nbEtage, :surface, :projet)", 
  {replacements: {date: new Date(req.body.dateCreation), nbPiece: req.body.nbPieces, nbChambre: req.body.nbChambres, nbEtage: req.body.nbEtage, surface: req.body.surface, projet: id}
  })
  .then(plan => {
    console.log(plan) ;
    res.send(JSON.stringify(plan)) ;
  });
}) ;

app.post("/edit/plan/:id", (req,res) => {
  sequelize.query("UPDATE plan SET creation = :date, nb_piece = :nbPiece, nb_chambre = :nbChambre, nb_etage = :nbEtage, surface = :surface WHERE id_plan = :id", 
  {replacements: {id: req.body.id, date: new Date(req.body.dateCreation), nbPiece: req.body.nbPieces, nbChambre: req.body.nbChambres, nbEtage: req.body.nbEtage, surface: req.body.surface}
  })
  .then(plan => {
    res.send(JSON.stringify(plan)) ;
  });
}) ;

app.post("/delete/plan", (req,res) => {
  sequelize.query("DELETE FROM plan WHERE id_plan = :id", 
  {replacements: {id: req.body.id}
  })
  .then(plan => {
    res.send(JSON.stringify(plan)) ;
  });
}) ;
// Notre app écoute sur le port 3000 donc pour intérroger notre api on call ici : localhost:3000
app.listen(3000, function () {
  console.log('Server start on port 3000!');
})
