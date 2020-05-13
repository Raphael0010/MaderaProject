-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 13 mai 2020 à 08:08
-- Version du serveur :  5.7.24
-- Version de PHP :  7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `madera`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `id_cli` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `tel` varchar(50) NOT NULL,
  `newsletter` varchar(50) NOT NULL,
  PRIMARY KEY (`id_cli`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id_cli`, `nom`, `prenom`, `mail`, `tel`, `newsletter`) VALUES
(1, 'Dupont', 'Marc', 'client1@test.fr', '00 00 00 00 00', '1');

-- --------------------------------------------------------

--
-- Structure de la table `commercial`
--

DROP TABLE IF EXISTS `commercial`;
CREATE TABLE IF NOT EXISTS `commercial` (
  `id_comm` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  PRIMARY KEY (`id_comm`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `commercial`
--

INSERT INTO `commercial` (`id_comm`, `nom`, `pass`) VALUES
(1, 'Richard Blanc', 'pwd'),
(2, 'Jean-Louis Moreaux', 'pwd');

-- --------------------------------------------------------

--
-- Structure de la table `composant`
--

DROP TABLE IF EXISTS `composant`;
CREATE TABLE IF NOT EXISTS `composant` (
  `id_composant` int(11) NOT NULL AUTO_INCREMENT,
  `caracteristiques` varchar(50) NOT NULL,
  `unite_usage` varchar(50) NOT NULL,
  `id_fam` int(11) NOT NULL,
  PRIMARY KEY (`id_composant`),
  KEY `COMPOSANT_FAMILLE_FK` (`id_fam`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `composant`
--

INSERT INTO `composant` (`id_composant`, `caracteristiques`, `unite_usage`, `id_fam`) VALUES
(1, 'Lisse bois', 'ml', 1),
(2, 'Fenetre', 'u', 2),
(3, 'Lame de parquet', 'ml', 1);

-- --------------------------------------------------------

--
-- Structure de la table `concerner_client_projet`
--

DROP TABLE IF EXISTS `concerner_client_projet`;
CREATE TABLE IF NOT EXISTS `concerner_client_projet` (
  `id_cli` int(11) NOT NULL,
  `id_projet` int(11) NOT NULL,
  PRIMARY KEY (`id_cli`,`id_projet`),
  KEY `CONCERNER_PROJET0_FK` (`id_projet`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `concerner_client_projet`
--

INSERT INTO `concerner_client_projet` (`id_cli`, `id_projet`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `contenir_module_composant`
--

DROP TABLE IF EXISTS `contenir_module_composant`;
CREATE TABLE IF NOT EXISTS `contenir_module_composant` (
  `id_composant` int(11) NOT NULL,
  `id_module` int(11) NOT NULL,
  `nombre_unite` int(11) NOT NULL,
  PRIMARY KEY (`id_composant`,`id_module`),
  KEY `CONTENIR_MODULE_COMPOSANT_MODULE0_FK` (`id_module`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `contenir_module_composant`
--

INSERT INTO `contenir_module_composant` (`id_composant`, `id_module`, `nombre_unite`) VALUES
(1, 1, 1),
(3, 3, 1),
(4, 2, 5),
(4, 3, 5),
(4, 4, 5),
(5, 6, 45),
(6, 5, 100);

-- --------------------------------------------------------

--
-- Structure de la table `contenir_module_plan`
--

DROP TABLE IF EXISTS `contenir_module_plan`;
CREATE TABLE IF NOT EXISTS `contenir_module_plan` (
  `id_module` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL,
  PRIMARY KEY (`id_module`,`id_plan`),
  KEY `CONTENIR_PLAN0_FK` (`id_plan`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `contenir_module_plan`
--

INSERT INTO `contenir_module_plan` (`id_module`, `id_plan`) VALUES
(1, 2),
(2, 2),
(4, 2),
(5, 2),
(6, 2);

-- --------------------------------------------------------

--
-- Structure de la table `coupe`
--

DROP TABLE IF EXISTS `coupe`;
CREATE TABLE IF NOT EXISTS `coupe` (
  `id_coupe` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_coupe` varchar(50) NOT NULL,
  `id_module` int(11) NOT NULL,
  PRIMARY KEY (`id_coupe`),
  KEY `COUPE_MODULE_FK` (`id_module`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `devis`
--

DROP TABLE IF EXISTS `devis`;
CREATE TABLE IF NOT EXISTS `devis` (
  `id_devis` int(11) NOT NULL AUTO_INCREMENT,
  `creation_devis` date NOT NULL,
  `modification_devis` date NOT NULL,
  `montant_total` int(11) NOT NULL,
  `remise_percent` int(11) NOT NULL,
  `date_acceptation_devis` date NOT NULL,
  `etat_devis` varchar(50) NOT NULL,
  `id_client` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL,
  PRIMARY KEY (`id_devis`),
  KEY `client_devis_FK` (`id_client`),
  KEY `planFK` (`id_plan`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `famille`
--

DROP TABLE IF EXISTS `famille`;
CREATE TABLE IF NOT EXISTS `famille` (
  `id_fam` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_fam` varchar(50) NOT NULL,
  PRIMARY KEY (`id_fam`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `famille`
--

INSERT INTO `famille` (`id_fam`, `libelle_fam`) VALUES
(1, 'Menuiserie'),
(2, 'Menuiserie extérieure');

-- --------------------------------------------------------

--
-- Structure de la table `fournir`
--

DROP TABLE IF EXISTS `fournir`;
CREATE TABLE IF NOT EXISTS `fournir` (
  `id_fournisseur` int(11) NOT NULL,
  `id_composant` int(11) NOT NULL,
  PRIMARY KEY (`id_fournisseur`,`id_composant`),
  KEY `FOURNIR_COMPOSANT0_FK` (`id_composant`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `fournir`
--

INSERT INTO `fournir` (`id_fournisseur`, `id_composant`) VALUES
(1, 1),
(1, 2),
(2, 3),
(5, 5),
(3, 6),
(1, 8);

-- --------------------------------------------------------

--
-- Structure de la table `fournisseur`
--

DROP TABLE IF EXISTS `fournisseur`;
CREATE TABLE IF NOT EXISTS `fournisseur` (
  `id_fournisseur` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `tel` varchar(50) NOT NULL,
  PRIMARY KEY (`id_fournisseur`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `fournisseur`
--

INSERT INTO `fournisseur` (`id_fournisseur`, `nom`, `mail`, `tel`) VALUES
(1, 'Le RoyMerlin', 'leroymerlin@leroymerlin.fr', '3630'),
(2, 'Castorama', 'casto@castorama.fr', '3915'),
(3, 'Point P', 'p@point.fr', '7845'),
(5, 'Couverture Toiturier', 'toit@couvreur.fr', '5566');

-- --------------------------------------------------------

--
-- Structure de la table `gamme`
--

DROP TABLE IF EXISTS `gamme`;
CREATE TABLE IF NOT EXISTS `gamme` (
  `id_gamme` int(11) NOT NULL AUTO_INCREMENT,
  `nom_gamme` varchar(50) NOT NULL,
  `huisserie` varchar(50) NOT NULL,
  `type_isolant` varchar(50) NOT NULL,
  `type_couverture` varchar(50) NOT NULL,
  `finition_ext` varchar(50) NOT NULL,
  PRIMARY KEY (`id_gamme`),
  UNIQUE KEY `GAMME_AK` (`type_isolant`,`type_couverture`,`finition_ext`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `gamme`
--

INSERT INTO `gamme` (`id_gamme`, `nom_gamme`, `huisserie`, `type_isolant`, `type_couverture`, `finition_ext`) VALUES
(1, 'Essential', 'Basic', 'Basic', 'Basic', 'Basic'),
(2, 'Elite', 'Top quality', 'Top quality', 'Top quality', 'Top quality');

-- --------------------------------------------------------

--
-- Structure de la table `module`
--

DROP TABLE IF EXISTS `module`;
CREATE TABLE IF NOT EXISTS `module` (
  `id_module` int(11) NOT NULL AUTO_INCREMENT,
  `nom_module` varchar(50) NOT NULL,
  `PUHT` bigint(20) NOT NULL,
  `id_gamme` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_module`),
  KEY `FKgamme` (`id_gamme`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `module`
--

INSERT INTO `module` (`id_module`, `nom_module`, `PUHT`, `id_gamme`) VALUES
(1, 'Pignon droit', 500, 1),
(2, 'Pignon gauche', 600, 1),
(3, 'Facade avant', 5000, 1),
(4, 'Facade arriere', 8000, 1),
(5, 'Sol', 5000, 1),
(6, 'Toit', 10000, 1);

-- --------------------------------------------------------

--
-- Structure de la table `plan`
--

DROP TABLE IF EXISTS `plan`;
CREATE TABLE IF NOT EXISTS `plan` (
  `id_plan` int(11) NOT NULL AUTO_INCREMENT,
  `creation` date NOT NULL,
  `nb_piece` int(11) NOT NULL,
  `nb_chambre` int(11) NOT NULL,
  `nb_etage` int(11) NOT NULL,
  `surface` int(11) NOT NULL,
  `id_devis` int(11) NOT NULL,
  `id_projet` int(11) NOT NULL,
  PRIMARY KEY (`id_plan`),
  KEY `devisFK` (`id_devis`),
  KEY `projetFK` (`id_projet`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `projet`
--

DROP TABLE IF EXISTS `projet`;
CREATE TABLE IF NOT EXISTS `projet` (
  `id_projet` int(11) NOT NULL AUTO_INCREMENT,
  `nom_projet` varchar(50) NOT NULL,
  `creation` date NOT NULL,
  `id_comm` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  PRIMARY KEY (`id_projet`),
  KEY `PROJET_CLIENT_FK` (`id_client`),
  KEY `PROJET_COMMERCIAL_FK` (`id_comm`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `projet`
--

INSERT INTO `projet` (`id_projet`, `nom_projet`, `creation`, `id_comm`, `id_client`) VALUES
(1, 'projetClient1', '2019-11-19', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `stocks_composants`
--

DROP TABLE IF EXISTS `stocks_composants`;
CREATE TABLE IF NOT EXISTS `stocks_composants` (
  `id_composant` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  PRIMARY KEY (`id_composant`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `composant`
--
ALTER TABLE `composant`
  ADD CONSTRAINT `COMPOSANT_FAMILLE_FK` FOREIGN KEY (`id_fam`) REFERENCES `famille` (`id_fam`);

--
-- Contraintes pour la table `concerner_client_projet`
--
ALTER TABLE `concerner_client_projet`
  ADD CONSTRAINT `CONCERNER_CLIENT_FK` FOREIGN KEY (`id_cli`) REFERENCES `client` (`id_cli`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CONCERNER_PROJET0_FK` FOREIGN KEY (`id_projet`) REFERENCES `projet` (`id_projet`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `contenir_module_composant`
--
ALTER TABLE `contenir_module_composant`
  ADD CONSTRAINT `contenirComposant` FOREIGN KEY (`id_composant`) REFERENCES `composant` (`id_composant`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `contenirModule` FOREIGN KEY (`id_module`) REFERENCES `module` (`id_module`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `contenir_module_plan`
--
ALTER TABLE `contenir_module_plan`
  ADD CONSTRAINT `contenirModulePlan1` FOREIGN KEY (`id_module`) REFERENCES `module` (`id_module`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `contenirPlan` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id_plan`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `coupe`
--
ALTER TABLE `coupe`
  ADD CONSTRAINT `COUPE_MODULE_FK` FOREIGN KEY (`id_module`) REFERENCES `module` (`id_module`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `devis`
--
ALTER TABLE `devis`
  ADD CONSTRAINT `client_devis_FK` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_cli`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `planFK` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id_plan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `fournir`
--
ALTER TABLE `fournir`
  ADD CONSTRAINT `compo` FOREIGN KEY (`id_composant`) REFERENCES `composant` (`id_composant`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fournisseur` FOREIGN KEY (`id_fournisseur`) REFERENCES `fournisseur` (`id_fournisseur`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `module`
--
ALTER TABLE `module`
  ADD CONSTRAINT `FKgamme` FOREIGN KEY (`id_gamme`) REFERENCES `gamme` (`id_gamme`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `plan`
--
ALTER TABLE `plan`
  ADD CONSTRAINT `devisFK` FOREIGN KEY (`id_devis`) REFERENCES `devis` (`id_devis`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projetFK` FOREIGN KEY (`id_projet`) REFERENCES `projet` (`id_projet`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `projet`
--
ALTER TABLE `projet`
  ADD CONSTRAINT `PROJET_CLIENT_FK` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_cli`),
  ADD CONSTRAINT `PROJET_COMMERCIAL_FK` FOREIGN KEY (`id_comm`) REFERENCES `commercial` (`id_comm`);

--
-- Contraintes pour la table `stocks_composants`
--
ALTER TABLE `stocks_composants`
  ADD CONSTRAINT `idcomposant` FOREIGN KEY (`id_composant`) REFERENCES `composant` (`id_composant`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
