-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 10. Mrz 2025 um 14:35
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `tsvapp`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzers`
--

CREATE TABLE `benutzers` (
  `id` int(11) NOT NULL,
  `nachname` varchar(255) NOT NULL,
  `vorname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefon` varchar(255) DEFAULT NULL,
  `passwort` varchar(255) NOT NULL,
  `rolle` enum('Administrator','Trainer','Normal') NOT NULL,
  `erstellungsdatum` varchar(255) DEFAULT NULL,
  `letzterLogin` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `benutzers`
--

INSERT INTO `benutzers` (`id`, `nachname`, `vorname`, `email`, `telefon`, `passwort`, `rolle`, `erstellungsdatum`, `letzterLogin`) VALUES
(1, 'test', 'test', 'test@test.com', '564 646 4546', '$2a$12$nKty3S04awxRQ9OQFiuWRuixVzNo7VEKiFF5u3A/9iiVNrU7P4j9W', 'Administrator', '2025-03-10T09:02:29.558Z', '2025-03-10T13:23:14.236Z'),
(2, 'eeeeeeeeeeeeee', 'eeeeeeeeeeee', 'testeeeeeeee@test.com', '564 564 56464', '$2a$12$u9CwO6rTUvWRjzRVAeQge.dqkqEVKg1eGlQfTPycxGmtLXyt6T6DC', 'Trainer', '2025-03-10T09:04:30.739Z', '2025-03-10T09:36:18.904Z'),
(19, 'uuuuuuuuuuuuu', 'uuuuuuuu', 'testeeeeeueee@test.com', '564 564 56464', '$2a$12$ZouovslT1tF6TUdvWd0HdevD9aqHgOjx690eef5JJM8VwWctbcP86', 'Trainer', '2025-03-10T09:05:17.596Z', '2025-03-10T09:05:17.596Z');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `dokuments`
--

CREATE TABLE `dokuments` (
  `id` int(11) NOT NULL,
  `senderid` int(11) NOT NULL,
  `titel` varchar(255) NOT NULL,
  `kategorie` enum('Protokol','Rechtliches','Anderes') NOT NULL,
  `type` enum('PDF','Word','Bild') NOT NULL,
  `bild` enum('JPG','PNG') DEFAULT NULL,
  `gueltigbis` varchar(255) DEFAULT NULL,
  `gueltigab` varchar(255) DEFAULT NULL,
  `erstelldatum` varchar(255) DEFAULT NULL,
  `aenderungsdatum` varchar(255) DEFAULT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `dokuments`
--

INSERT INTO `dokuments` (`id`, `senderid`, `titel`, `kategorie`, `type`, `bild`, `gueltigbis`, `gueltigab`, `erstelldatum`, `aenderungsdatum`, `url`) VALUES
(1, 1, 'Document 1', 'Protokol', 'PDF', NULL, NULL, '2025-03-01', '2025-03-01', NULL, 'https://drive.google.com/file/d/1WD-hAhZLcy36mM6SamlXzjtlIP7fUtJp/view?usp=sharing'),
(2, 2, 'Document 2', 'Rechtliches', 'Word', NULL, NULL, '2025-03-02', '2025-03-02', NULL, 'https://docs.google.com/document/d/1Ciy9DUvokZDFJwS7WtVOUyPBjymimux5/edit?usp=sharing&ouid=104730325324598729450&rtpof=true&sd=true'),
(3, 3, 'Document 3', 'Anderes', 'Bild', 'JPG', NULL, '2025-03-03', '2025-03-03', NULL, 'https://docs.google.com/document/d/1Ciy9DUvokZDFJwS7WtVOUyPBjymimux5/edit?usp=sharing&ouid=104730325324598729450&rtpof=true&sd=true'),
(4, 4, 'Document 4', 'Protokol', '', NULL, NULL, '2025-03-04', '2025-03-04', NULL, 'https://drive.google.com/file/d/1WD-hAhZLcy36mM6SamlXzjtlIP7fUtJp/view?usp=sharing'),
(5, 5, 'Document 5', 'Rechtliches', 'Word', NULL, NULL, '2025-03-05', '2025-03-05', NULL, 'https://docs.google.com/document/d/1Ciy9DUvokZDFJwS7WtVOUyPBjymimux5/edit?usp=sharing&ouid=104730325324598729450&rtpof=true&sd=true'),
(6, 6, 'Document 6', 'Anderes', 'Bild', 'JPG', NULL, '2025-03-06', '2025-03-06', NULL, 'https://docs.google.com/document/d/1Ciy9DUvokZDFJwS7WtVOUyPBjymimux5/edit?usp=sharing&ouid=104730325324598729450&rtpof=true&sd=true'),
(7, 7, 'Document 7', 'Protokol', 'PDF', NULL, NULL, '2025-03-07', '2025-03-07', NULL, 'https://drive.google.com/file/d/1WD-hAhZLcy36mM6SamlXzjtlIP7fUtJp/view?usp=sharing'),
(8, 8, 'Document 8', 'Rechtliches', 'Word', NULL, NULL, '2025-03-08', '2025-03-08', NULL, 'https://docs.google.com/document/d/1Ciy9DUvokZDFJwS7WtVOUyPBjymimux5/edit?usp=sharing&ouid=104730325324598729450&rtpof=true&sd=true'),
(9, 9, 'Document 9', 'Anderes', 'Bild', 'PNG', NULL, '2025-03-09', '2025-03-09', NULL, 'https://docs.google.com/document/d/1Ciy9DUvokZDFJwS7WtVOUyPBjymimux5/edit?usp=sharing&ouid=104730325324598729450&rtpof=true&sd=true'),
(10, 10, 'Document 10', 'Protokol', 'PDF', NULL, NULL, '2025-03-10', '2025-03-10', NULL, 'https://drive.google.com/file/d/1WD-hAhZLcy36mM6SamlXzjtlIP7fUtJp/view?usp=sharing'),
(11, 11, 'Document 11', 'Rechtliches', 'Word', NULL, NULL, '2025-03-11', '2025-03-11', NULL, 'https://docs.google.com/document/d/1Ciy9DUvokZDFJwS7WtVOUyPBjymimux5/edit?usp=sharing&ouid=104730325324598729450&rtpof=true&sd=true'),
(12, 12, 'Document 12', 'Anderes', 'Bild', 'JPG', NULL, '2025-03-12', '2025-03-12', NULL, 'https://docs.google.com/document/d/1Ciy9DUvokZDFJwS7WtVOUyPBjymimux5/edit?usp=sharing&ouid=104730325324598729450&rtpof=true&sd=true'),
(13, 13, 'Document 13', 'Protokol', 'PDF', NULL, NULL, '2025-03-13', '2025-03-13', NULL, 'https://drive.google.com/file/d/1WD-hAhZLcy36mM6SamlXzjtlIP7fUtJp/view?usp=sharing'),
(14, 14, 'Document 14', 'Rechtliches', 'Word', NULL, NULL, '2025-03-14', '2025-03-14', NULL, 'https://docs.google.com/document/d/1Ciy9DUvokZDFJwS7WtVOUyPBjymimux5/edit?usp=sharing&ouid=104730325324598729450&rtpof=true&sd=true'),
(15, 15, 'Document 15', 'Anderes', 'Bild', 'JPG', NULL, '2025-03-15', '2025-03-15', NULL, 'https://docs.google.com/document/d/1Ciy9DUvokZDFJwS7WtVOUyPBjymimux5/edit?usp=sharing&ouid=104730325324598729450&rtpof=true&sd=true');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `information`
--

CREATE TABLE `information` (
  `id` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `titel` varchar(255) NOT NULL,
  `beschreibung` text NOT NULL,
  `kategorie` varchar(255) NOT NULL,
  `startdatum` varchar(255) NOT NULL,
  `enddatum` varchar(255) DEFAULT NULL,
  `ort` varchar(255) DEFAULT NULL,
  `wichtig` tinyint(1) DEFAULT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `information`
--

INSERT INTO `information` (`id`, `senderId`, `titel`, `beschreibung`, `kategorie`, `startdatum`, `enddatum`, `ort`, `wichtig`, `status`) VALUES
(1, 1, 'Info 1', 'Description de l\'information 1', 'Allgemein', '2025-03-01', '2025-03-02', 'Lieu 1', 1, 'Active'),
(2, 2, 'Info 2', 'Description de l\'information 2', 'Ereignis', '2025-03-02', '2025-03-03', 'Lieu 2', 0, 'Inactive'),
(3, 3, 'Info 3', 'Description de l\'information 3', 'Allgemein', '2025-03-03', '2025-03-04', 'Lieu 3', 1, 'Active'),
(4, 4, 'Info 4', 'Description de l\'information 4', 'Ereignis', '2025-03-04', '2025-03-05', 'Lieu 4', 1, 'Active'),
(5, 5, 'Info 5', 'Description de l\'information 5', 'Allgemein', '2025-03-05', '2025-03-06', 'Lieu 5', 0, 'Inactive'),
(6, 6, 'Info 6', 'Description de l\'information 6', 'Ereignis', '2025-03-06', '2025-03-07', 'Lieu 6', 1, 'Active'),
(7, 7, 'Info 7', 'Description de l\'information 7', 'Allgemein', '2025-03-07', '2025-03-08', 'Lieu 7', 0, 'Inactive'),
(8, 8, 'Info 8', 'Description de l\'information 8', 'Ereignis', '2025-03-08', '2025-03-09', 'Lieu 8', 1, 'Active'),
(9, 9, 'Info 9', 'Description de l\'information 9', 'Allgemein', '2025-03-09', '2025-03-10', 'Lieu 9', 0, 'Inactive'),
(10, 10, 'Info 10', 'Description de l\'information 10', 'Ereignis', '2025-03-10', '2025-03-11', 'Lieu 10', 1, 'Active'),
(11, 11, 'Info 11', 'Description de l\'information 11', 'Allgemein', '2025-03-11', '2025-03-12', 'Lieu 11', 0, 'Inactive'),
(12, 12, 'Info 12', 'Description de l\'information 12', 'Ereignis', '2025-03-12', '2025-03-13', 'Lieu 12', 1, 'Active'),
(13, 13, 'Info 13', 'Description de l\'information 13', 'Allgemein', '2025-03-13', '2025-03-14', 'Lieu 13', 1, 'Active'),
(14, 14, 'Info 14', 'Description de l\'information 14', 'Ereignis', '2025-03-14', '2025-03-15', 'Lieu 14', 0, 'Inactive'),
(15, 15, 'Info 15', 'Description de l\'information 15', 'Allgemein', '2025-03-15', '2025-03-16', 'Lieu 15', 1, 'Active');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereins`
--

CREATE TABLE `vereins` (
  `id` int(11) NOT NULL,
  `coachid` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `telefon` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `beschreibung` text DEFAULT NULL,
  `zusatzinformation` text DEFAULT NULL,
  `regeln` text DEFAULT NULL,
  `istGegner` tinyint(1) NOT NULL,
  `gegnerIds` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`gegnerIds`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `vereins`
--

INSERT INTO `vereins` (`id`, `coachid`, `name`, `telefon`, `email`, `adresse`, `beschreibung`, `zusatzinformation`, `regeln`, `istGegner`, `gegnerIds`) VALUES
(51, 1, 'Team A1', '0123456794', 'oppA1f@example.com', 'Adresse 6', NULL, NULL, NULL, 0, NULL),
(52, 2, 'Team A2', '0123456795', 'oppA2f@example.com', 'Adresse 7', NULL, NULL, NULL, 0, NULL),
(53, 19, 'Team A3', '0123456796', 'oppA3f@example.com', 'Adresse 8', NULL, NULL, NULL, 0, NULL),
(54, 2, 'Team A4', '0123456797', 'oppA4f@example.com', 'Adresse 9', NULL, NULL, NULL, 0, NULL),
(55, 19, 'Team A5', '0123456798', 'oppA5f@example.com', 'Adresse 10', NULL, NULL, NULL, 0, NULL),
(56, 1, 'Gegner 1-A1', '0123456799', 'adv1a1@example.com', 'Adresse 11', NULL, NULL, NULL, 1, '[51]'),
(57, 2, 'Gegner 2-A1', '0123456800', 'adv2a1@example.com', 'Adresse 12', NULL, NULL, NULL, 1, '[51]'),
(58, 19, 'Gegner 3-A1', '0123456801', 'adv3a1@example.com', 'Adresse 13', NULL, NULL, NULL, 1, '[51]'),
(59, 1, 'Gegner 4-A1', '0123456802', 'adv4a1@example.com', 'Adresse 14', NULL, NULL, NULL, 1, '[51]'),
(60, 2, 'Gegner 5-A1', '0123456803', 'adv5a1@example.com', 'Adresse 15', NULL, NULL, NULL, 1, '[51]'),
(61, 19, 'Gegner 1-A2', '0123456804', 'adv1a2@example.com', 'Adresse 16', NULL, NULL, NULL, 1, '[52]'),
(62, 19, 'Gegner 2-A2', '0123456805', 'adv2a2@example.com', 'Adresse 17', NULL, NULL, NULL, 1, '[52]'),
(63, 2, 'Gegner 3-A2', '0123456806', 'adv3a2@example.com', 'Adresse 18', NULL, NULL, NULL, 1, '[52]'),
(64, 1, 'Gegner 4-A2', '0123456807', 'adv4a2@example.com', 'Adresse 19', NULL, NULL, NULL, 1, '[52]'),
(65, 1, 'Gegner 5-A2', '0123456808', 'adv5a2@example.com', 'Adresse 20', NULL, NULL, NULL, 1, '[52]'),
(71, 2, 'Gegner 1-A4', '0123456814', 'adv1a4@example.com', 'Adresse 26', NULL, NULL, NULL, 1, '[54]'),
(72, 19, 'Gegner 2-A4', '0123456815', 'adv2a4@example.com', 'Adresse 27', NULL, NULL, NULL, 1, '[54]'),
(73, 2, 'Gegner 3-A4', '0123456816', 'adv3a4@example.com', 'Adresse 28', NULL, NULL, NULL, 1, '[54]'),
(74, 1, 'Gegner 4-A4', '0123456817', 'adv4a4@example.com', 'Adresse 29', NULL, NULL, NULL, 1, '[54]'),
(75, 2, 'Gegner 5-A4', '0123456818', 'adv5a4@example.com', 'Adresse 30', NULL, NULL, NULL, 1, '[54]'),
(76, 19, 'Gegner 1-A5', '0123456819', 'adv1a5@example.com', 'Adresse 31', NULL, NULL, NULL, 1, '[55]'),
(77, 2, 'Gegner 2-A5', '0123456820', 'adv2a5@example.com', 'Adresse 32', NULL, NULL, NULL, 1, '[55]'),
(78, 1, 'Gegner 3-A5', '0123456821', 'adv3a5@example.com', 'Adresse 33', NULL, NULL, NULL, 1, '[55]'),
(79, 19, 'Gegner 4-A5', '0123456822', 'adv4a5@example.com', 'Adresse 34', NULL, NULL, NULL, 1, '[55]'),
(80, 1, 'Gegner 5-A5', '0123456823', 'adv5a5@example.com', 'Adresse 35', NULL, NULL, NULL, 1, '[55]');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `benutzers`
--
ALTER TABLE `benutzers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`);

--
-- Indizes für die Tabelle `dokuments`
--
ALTER TABLE `dokuments`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `information`
--
ALTER TABLE `information`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `vereins`
--
ALTER TABLE `vereins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coachid` (`coachid`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `benutzers`
--
ALTER TABLE `benutzers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT für Tabelle `dokuments`
--
ALTER TABLE `dokuments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT für Tabelle `information`
--
ALTER TABLE `information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT für Tabelle `vereins`
--
ALTER TABLE `vereins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `vereins`
--
ALTER TABLE `vereins`
  ADD CONSTRAINT `vereins_ibfk_1` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_2` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_3` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_4` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_5` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
