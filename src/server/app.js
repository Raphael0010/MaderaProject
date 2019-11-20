const env = require('dotenv').config()
const express = require('express');
const moment = require('moment');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(`mariadb://${env.parsed.USER}:${env.parsed.PASS}@${env.parsed.HOST}:${env.parsed.PORT}/${env.parsed.BDD}`,
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

app.get("/listClients", (req,res) => {
  sequelize.query("SELECT id_cli as id, nom, prenom, mail, tel, newsletter FROM client", { type: sequelize.QueryTypes.SELECT})
  .then(users => {
    res.send(JSON.stringify(users))
  });
})

app.post("/client", (req,res) => {
  sequelize.query("INSERT INTO client (nom, prenom, mail, tel, newsletter) VALUES (:nom, :prenom, :mail, :tel, :newsletter)",
  {replacements: {nom: req.body.nom, prenom: req.body.prenom, mail: req.body.mail, tel: req.body.tel, newsletter: req.body.newsletter}
  })
  .then(client => {
    res.send(JSON.stringify(client))
  });
}) ;

app.post("/edit/client", (req,res) => {
<<<<<<< HEAD
  console.log("WESH:"+req.body.nom);
  sequelize.query("UPDATE client SET nom = :nom, prenom = :prenom, mail = :mail, tel = :tel, newsletter = :newsletter WHERE id_cli = :id", 
=======
  sequelize.query("UPDATE client SET nom = :nom, prenom = :prenom, mail = :mail, tel = :tel, newsletter = :newsletter WHERE id_cli = :id",
>>>>>>> 346d6e99abc5591aca11e47b643764cd93653fb1
  {replacements: {id: req.body.id, nom: req.body.nom, prenom: req.body.prenom, mail: req.body.mail, tel: req.body.tel, newsletter: req.body.newsletter}
  })
  .then(client => {
    res.send(JSON.stringify(client))
  });
}) ;

app.get("/deleteClient/:id", (req,res) => {
  sequelize.query(`DELETE FROM client WHERE id_cli = ${req.params.id}`)
  .then(e=>{
    res.send(JSON.parse("{\"code\":200}"))
  });
})

// ------ Client ----------
app.get("/client", (req,res) => {
  sequelize.query("SELECT id_cli, nom AS nomClient, client.prenom AS prenomClient FROM client",
  { type: sequelize.QueryTypes.SELECT})
  .then(clients => {
    res.send(JSON.stringify(clients)) ;
  });
});


// ------ Login ----------
app.post('/loginVerif', function (req, res) {
  sequelize.query('SELECT * FROM commercial WHERE nom = :nom AND pass = :pass', { replacements: {nom: req.body.username, pass: req.body.password}, type: sequelize.QueryTypes.SELECT})
  .then(commercial => {
    if (commercial.length === 0){
      res.send(false);
    }else{
      res.send(true);
    }
  })
});

// ------ Devis ----------
app.get("/listDevis", (req,res) => {
  sequelize.query("SELECT id_devis as id, CONCAT(nom,' ',prenom) as client, etat_devis as etat FROM devis INNER JOIN client on devis.id_client = client.id_cli", { type: sequelize.QueryTypes.SELECT})
  .then(devis => {
    res.send(JSON.stringify(devis)) ;
  });
});

app.get("/deleteDevis/:id", (req,res) => {
  sequelize.query(`DELETE FROM devis WHERE id_devis = ${req.params.id}`)
  .then(e=> {
    res.send(JSON.parse("{\"code\":200}"))
  });
});

// ------ Projet ----------
app.get("/projet", (req,res) => {
  sequelize.query("SELECT id_projet AS id, nom_projet AS nom, client.nom AS nomClient, client.prenom AS prenomClient, creation AS dateCreation, id_comm AS idComm, id_client AS idClient FROM projet INNER JOIN client ON projet.id_client = client.id_cli",
  { type: sequelize.QueryTypes.SELECT})
  .then(projets => {
    res.send(JSON.stringify(projets)) ;
  });
});

app.post("/projet", (req,res) => {
  sequelize.query(`SELECT id_comm FROM commercial WHERE nom = "${req.body.nom_comm}"`,
    {type: sequelize.QueryTypes.SELECT})
    .then(commercial => {
      const idComm = commercial[0].id_comm ;
      sequelize.query("INSERT INTO projet (nom_projet, creation, id_comm, id_client) VALUES (:projet, :date, :comm, :client)",
      {replacements: {projet: req.body.nom, date: new Date(req.body.date), client: req.body.client, comm: idComm}
      })
      .then(projets => {
        const newIdProject = projets[0] ;
        sequelize.query("INSERT INTO concerner_client_projet(id_cli, id_projet) VALUES (:client, :projet)",
        {replacements: {client: req.body.client, projet: newIdProject }
        })
        .then(projets => {
          res.send(JSON.stringify(projets)) ;
        });
      });
    });
});

app.post("/edit/projet", (req,res) => {
  let dateTimeZone = moment.tz(req.body.date,"Europe/Paris").format('YYYY-MM-DD hh:mm:ss');
  sequelize.query("UPDATE projet SET nom_projet = :projet, creation = :date, id_comm = :comm, id_client = :client WHERE id_projet = :id",
  {replacements: {id: req.body.id, projet: req.body.nom, date: dateTimeZone, client: req.body.client, comm: 1}
  })
  .then(projets => {
    res.send(JSON.stringify(projets)) ;
  });
});

app.post("/delete/projet", (req,res) => {
  sequelize.query("DELETE FROM projet WHERE id_projet = :id",
  {replacements: {id: req.body.id}
  })
  .then(projets => {
    res.send(JSON.stringify(projets)) ;
  });
});

// ------ Stocks --------
app.get("/listStocks", (req,res) => {
  sequelize.query("SELECT caracteristiques as composant, nom as fournisseur, CONCAT(quantite, ' ', unite_usage) as quantity  FROM composant, fournisseur, fournir, stocks_composants WHERE composant.id_composant = fournir.id_composant and fournisseur.id_fournisseur = fournir.id_fournisseur and composant.id_composant = stocks_composants.id_composant", { type: sequelize.QueryTypes.SELECT})
  .then(users => {
    res.send(JSON.stringify(users))
  });
});

// ------ Plan ----------
app.get("/plan/:id", (req,res) => {
  sequelize.query(`SELECT id_plan AS id, creation AS dateCreation, nb_piece AS nbPieces, nb_chambre AS nbChambres, nb_etage AS nbEtage, surface, id_devis AS idDevis, id_projet AS idProjet FROM plan WHERE id_projet = ${req.params.id}`,
  { type: sequelize.QueryTypes.SELECT})
  .then(plan => {
    res.send(JSON.stringify(plan)) ;
  });
});

app.post("/plan/:id", (req,res) => {
  const id = parseInt(req.params.id, 10) ;
  let dateTimeZone = moment.tz(req.body.dateCreation,"Europe/Paris").format('YYYY-MM-DD hh:mm:ss');

  sequelize.query("INSERT INTO plan (creation, nb_piece, nb_chambre, nb_etage, surface, id_projet) VALUES (:date, :nbPiece, :nbChambre, :nbEtage, :surface, :projet)",
  {replacements: {date: dateTimeZone, nbPiece: req.body.nbPieces, nbChambre: req.body.nbChambres, nbEtage: req.body.nbEtage, surface: req.body.surface, projet: id}
  })
  .then(plan => {
    res.send(JSON.stringify(plan)) ;
  })
});

app.post("/edit/plan/:id", (req,res) => {
  let dateTimeZone = moment.tz(req.body.dateCreation,"Europe/Paris").format('YYYY-MM-DD hh:mm:ss');
  sequelize.query("UPDATE plan SET creation = :date, nb_piece = :nbPiece, nb_chambre = :nbChambre, nb_etage = :nbEtage, surface = :surface WHERE id_plan = :id",
  {replacements: {id: req.body.id, date: dateTimeZone, nbPiece: req.body.nbPieces, nbChambre: req.body.nbChambres, nbEtage: req.body.nbEtage, surface: req.body.surface}
  })
  .then(plan => {
    res.send(JSON.stringify(plan)) ;
  });
});

app.post("/delete/plan", (req,res) => {
  sequelize.query("DELETE FROM plan WHERE id_plan = :id",
  {replacements: {id: req.body.id}
  })
  .then(plan => {
    res.send(JSON.stringify(plan)) ;
  });
});

// Notre app écoute sur le port 3000 donc pour intérroger notre api on call ici : localhost:3000
app.listen(3000, function () {
  console.log('Server start on port 3000!');
});

