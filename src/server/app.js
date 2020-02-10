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
  sequelize.query("SELECT id_cli as id, nom, prenom, mail, tel, newsletter FROM client",
  { type: sequelize.QueryTypes.SELECT})
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
  sequelize.query("UPDATE client SET nom = :nom, prenom = :prenom, mail = :mail, tel = :tel, newsletter = :newsletter WHERE id_cli = :id",
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

// Get information about the DEVIS
app.get("/devis/:id", (req,res) => {
  sequelize.query(`
    SELECT creation_devis,
      modification_devis,
      montant_total,
      remise_percent,
      date_acceptation_devis,
      etat_devis,
      client.nom as nom_client,
      client.prenom as prenom_client,
      client.mail,
      client.tel,
      plan.creation,
      plan.nb_piece,
      plan.nb_chambre,
      plan.nb_etage,
      plan.surface,
      projet.nom_projet,
      projet.creation,
      commercial.nom,
      plan.id_plan,
      projet.id_projet as idProjet
      FROM devis
      INNER JOIN client ON devis.id_client = client.id_cli
      INNER JOIN plan ON devis.id_plan = plan.id_plan
      INNER JOIN projet ON plan.id_projet = projet.id_projet
      INNER JOIN commercial ON projet.id_comm = commercial.id_comm
      WHERE devis.id_devis = ${req.params.id}`)
      .then(e => {
        res.send(JSON.stringify(e[0]));
      })
});

app.post("/devis", (req,res) => {
  const dateCreation = moment.tz(req.body.creationDevis,"Europe/Paris").format('YYYY-MM-DD hh:mm:ss');
  const dateModification = moment.tz(req.body.modificationDevis,"Europe/Paris").format('YYYY-MM-DD hh:mm:ss');
  const dateAcceptation = moment.tz(req.body.acceptationDevis,"Europe/Paris").format('YYYY-MM-DD hh:mm:ss');
  sequelize.query(`INSERT INTO devis (creation_devis, modification_devis, montant_total, remise_percent, date_acceptation_devis, etat_devis, id_client, id_plan)
                   VALUES (:creation_devis, :modification_devis, :montant_total, :remise_percent, :date_acceptation_devis, :etat_devis, :id_client, :id_plan)`,
  {
    replacements: {
      creation_devis: dateCreation,
      modification_devis: dateModification,
      montant_total: req.body.montantTotal,
      remise_percent: req.body.remise,
      date_acceptation_devis: dateAcceptation,
      etat_devis: req.body.etat,
      id_client: req.body.idClient,
      id_plan: req.body.idPlan
    }
  })
  .then(idDevis => {
    res.send(JSON.stringify(idDevis[0])) ;
  });
});


// ------ Projet ----------
app.get("/projet", (req,res) => {
  sequelize.query(`SELECT id_projet AS id,
                   nom_projet AS nom,
                   client.nom AS nomClient,
                   client.prenom AS prenomClient,
                   creation AS dateCreation,
                   id_comm AS idComm,
                   id_client AS idClient
                   FROM projet
                   INNER JOIN client ON projet.id_client = client.id_cli`, {type: sequelize.QueryTypes.SELECT})
  .then(projets => {
    res.send(JSON.stringify(projets)) ;
  });
});

app.get("/projet/:id", (req,res) => {
  sequelize.query(`SELECT id_projet AS id,
                   nom_projet AS nom,
                   client.nom AS nomClient,
                   client.prenom AS prenomClient,
                   creation AS dateCreation,
                   id_comm AS idComm,
                   id_client AS idClient
                   FROM projet
                   INNER JOIN client ON projet.id_client = client.id_cli
                   WHERE id_projet = ${req.params.id}`, {type: sequelize.QueryTypes.SELECT})
  .then(projets => {
    res.send(JSON.stringify(projets[0])) ;
  });
});

app.post("/projet", (req,res) => {
  let dateTimeZone = moment.tz(req.body.date,"Europe/Paris").format('YYYY-MM-DD hh:mm:ss');
  sequelize.query(`SELECT id_comm
                   FROM commercial
                   WHERE nom = "${req.body.nom_comm}"`,
    {type: sequelize.QueryTypes.SELECT})
    .then(commercial => {
      const idComm = commercial[0].id_comm ;
      sequelize.query(`INSERT INTO projet (nom_projet, creation, id_comm, id_client)
                       VALUES (:projet, :date, :comm, :client)`,
      {
        replacements: {
          projet: req.body.nom,
          date:dateTimeZone,
          client: req.body.client,
          comm: idComm}
      })
      .then(projets => {
        const newIdProject = projets[0] ;
        sequelize.query(`INSERT INTO concerner_client_projet(id_cli, id_projet)
                         VALUES (:client, :projet)`,
        {
          replacements: {
            client: req.body.client,
            projet: newIdProject
          }
        })
        .then(projets => {
        });
      });
    });
});

app.post("/edit/projet", (req,res) => {
  let dateTimeZone = moment.tz(req.body.date,"Europe/Paris").format('YYYY-MM-DD hh:mm:ss');
  sequelize.query(`SELECT id_comm
                   FROM commercial
                   WHERE nom = "${req.body.nom_comm}"`, {type: sequelize.QueryTypes.SELECT})
    .then(commercial => {
      const idComm = commercial[0].id_comm ;
      sequelize.query(`UPDATE projet SET nom_projet = :projet,
                      creation = :date,
                      id_comm = :comm,
                      id_client = :client
                      WHERE id_projet = :id`,
      {
        replacements: {
          id: req.body.id,
          projet: req.body.nom,
          date: dateTimeZone,
          client: req.body.client,
          comm: idComm
        }
      })
      .then(projets => {
      });
    })
});

app.post("/delete/projet", (req,res) => {
  sequelize.query(`DELETE FROM projet WHERE id_projet = :id`,
  {
    replacements: {
      id: req.body.id
    }
  })
  .then(projets => {
    res.send(JSON.stringify(projets)) ;
  });
});

// ------ Stocks --------
app.get("/listStocks", (req,res) => {
  sequelize.query(`SELECT caracteristiques as composant,
                    nom as fournisseur,
                    CONCAT(quantite, ' ', unite_usage) as quantity,
                    id_fam
                    FROM composant, fournisseur, fournir, stocks_composants
                    WHERE composant.id_composant = fournir.id_composant
                    AND fournisseur.id_fournisseur = fournir.id_fournisseur
                    AND composant.id_composant = stocks_composants.id_composant`,
  {type: sequelize.QueryTypes.SELECT})
  .then(stocks => {
    res.send(JSON.stringify(stocks))
  });
});

// ------ Famille composants --------
app.get("/famille", (req,res) => {
  sequelize.query("SELECT id_fam AS id, libelle_fam AS libelle FROM famille",
  {type: sequelize.QueryTypes.SELECT})
  .then(familles => {
    res.send(JSON.stringify(familles))
  });
});

// ------ Module --------
app.get("/module", (req,res) => {
  sequelize.query(`SELECT id_module AS id,
                   nom_module AS nom
                   FROM module`,
  {type: sequelize.QueryTypes.SELECT})
  .then(modules => {
    res.send(JSON.stringify(modules))
  });
});

app.get("/plan/:id/module", (req,res) => {
  sequelize.query(`SELECT module.id_module AS id,
                   module.nom_module AS nom,
                   module.PUHT AS prix
                   FROM contenir_module_plan
                   INNER JOIN module ON module.id_module = contenir_module_plan.id_module
                   AND contenir_module_plan.id_plan = ${req.params.id}`, {type: sequelize.QueryTypes.SELECT})
  .then(modules => {
    res.send(JSON.stringify(modules))
  });
});

app.post("/module", (req,res) => {
  sequelize.query(`INSERT INTO contenir_module_plan (id_plan, id_module)
                   VALUES (:id_plan, :id_module)`,
  {
    replacements: {
      id_plan: req.body.id_plan,
      id_module: req.body.id_module
    }
  })
  .then(module_plan => {
    res.send(JSON.stringify(module_plan)) ;
  });
});

// ------ Gamme --------
app.get("/gamme", (req,res) => {
  sequelize.query("SELECT id_gamme AS id, nom_gamme FROM gamme",
  {type: sequelize.QueryTypes.SELECT})
  .then(gammes => {
    res.send(JSON.stringify(gammes))
  });
});

// ------ Composant --------
app.get("/composant", (req,res) => {
  sequelize.query(`SELECT composant.id_composant AS id,
                   id_module,
                   caracteristiques,
                   id_fam, nombre_unite AS qte
                   FROM composant
                   INNER JOIN contenir_module_composant ON contenir_module_composant.id_composant = composant.id_composant`,
  {type: sequelize.QueryTypes.SELECT})
  .then(composants => {
    res.send(JSON.stringify(composants))
  });
});


// ------ Plan ----------
app.get("/plan/:id", (req,res) => {
  sequelize.query(`SELECT id_plan AS id,
                   creation AS dateCreation,
                   nb_piece AS nbPieces,
                   nb_chambre AS nbChambres,
                   nb_etage AS nbEtage,
                   surface,
                   id_devis AS idDevis,
                   id_projet AS idProjet
                   FROM plan
                   WHERE id_projet = ${req.params.id}`, { type: sequelize.QueryTypes.SELECT})
  .then(plan => {
    res.send(JSON.stringify(plan)) ;
  });
});

app.get("/planDevis/:id", (req,res) => {
  sequelize.query(`SELECT module.nom_module, module.PUHT, gamme.nom_gamme, gamme.huisserie,gamme.type_isolant, gamme.type_couverture, gamme.finition_ext
  FROM contenir_module_plan
  INNER JOIN module ON contenir_module_plan.id_module = module.id_module
  INNER JOIN gamme ON module.id_gamme = gamme.id_gamme
  WHERE contenir_module_plan.id_plan = ${req.params.id}`).then( e => {
    res.send(JSON.stringify(e[0])) ;
  })
});

app.post("/plan/:id", (req,res) => {
  const id = parseInt(req.params.id, 10) ;
  const listModule = req.body.listModule;
  let dateTimeZone = moment.tz(req.body.dateCreation,"Europe/Paris").format('YYYY-MM-DD hh:mm:ss');
  sequelize.query(`INSERT INTO plan (creation, nb_piece, nb_chambre, nb_etage, surface, id_projet)
                   VALUES (:date, :nbPiece, :nbChambre, :nbEtage, :surface, :projet)`,
  {
    replacements: {
      date: dateTimeZone,
      nbPiece: req.body.nbPieces,
      nbChambre: req.body.nbChambres,
      nbEtage: req.body.nbEtage,
      surface: req.body.surface,
      projet: id
    }
  })
  .then(plan => {
    const newIdPlan = plan[0] ;
    listModule.forEach(module => {
      sequelize.query(`INSERT INTO contenir_module_plan (id_plan, id_module)
                       VALUES (:id_plan, :id_module)`,
      {
        replacements: {
          id_plan: newIdPlan,
          id_module: module.id
        }
      })
      .then(plan => {
        res.send(JSON.stringify(plan)) ;
      });
    });
  })
});

app.post("/plan/:idPlan/devis/:id", (req,res) => {
  sequelize.query(`UPDATE plan SET id_devis = ${req.params.id}
                  WHERE id_plan = ${req.params.idPlan}`,)
  .then(plan => {
  })
});

app.post("/edit/plan/:id", (req,res) => {
  let dateTimeZone = moment.tz(req.body.dateCreation,"Europe/Paris").format('YYYY-MM-DD hh:mm:ss');
  const modules = req.body.modules;
  sequelize.query(`UPDATE plan SET creation = :date,
                   nb_piece = :nbPiece,
                   nb_chambre = :nbChambre,
                   nb_etage = :nbEtage,
                   surface = :surface
                   WHERE id_plan = :id`,
  {replacements:
    {
      id: req.body.id,
      date: dateTimeZone,
      nbPiece: req.body.nbPieces,
      nbChambre: req.body.nbChambres,
      nbEtage: req.body.nbEtage,
      surface: req.body.surface
    }
  })
  .then(plan => {
    sequelize.query(`DELETE
                     FROM contenir_module_plan
                     WHERE id_plan = ${req.body.id}`)
    .then(plan => {
      modules.forEach(module => {
        sequelize.query(`INSERT INTO contenir_module_plan (id_plan, id_module)
                         VALUES (:id_plan, :id_module)`,
        {replacements:
          {
            id_plan: req.body.id,
            id_module: module.id
          }
        })
        .then(plan => {
        });
      })
    });
  });
});

app.post("/delete/plan", (req,res) => {
  sequelize.query("DELETE FROM plan WHERE id_plan = :id",
  {
    replacements: {
      id: req.body.id
    }
  })
  .then(plan => {
    res.send(JSON.stringify(plan)) ;
  });
});

// Notre app écoute sur le port 3000 donc pour intérroger notre api on call ici : localhost:3000
app.listen(3000, function () {
  console.log('Server start on port 3000!');
});

