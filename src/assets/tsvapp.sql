-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 17. Apr 2025 um 14:44
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
(1, 'billy', 'MB', 'contactcm02@gmail.com', '+49 176 343 64986', '$2a$12$J0Ke7aN0wDt/Q4FWGgOcc.GIXCCABfqZNbEJN7kjUsP21RrcpilIq', 'Administrator', '2025-04-15T08:02:01.322Z', '2025-04-17T12:10:23.299Z'),
(2, 'Trainer 1', 'Eins', 'trainer1@gmail.com', '+49 122 354 5482', '$2a$12$XVLyCD8DiF1WzbfB5bvWgOoPT8LRZwc4ANrxeCzOfBCptWU73tyNy', 'Trainer', '2025-04-15T08:07:48.074Z', '2025-04-17T10:39:07.550Z'),
(3, 'Trainer 2', 'Zwei', 'trainer2@gmail.com', '+49 173 555 6655', '$2a$12$D/4m9G7nO1n1Inqy6r22Mu9PhaF4.z0w86y2iocg3NC8ns.uYNDQu', 'Trainer', '2025-04-15T08:08:53.493Z', '2025-04-15T08:09:27.708Z'),
(4, 'Trainer 3', 'Drei', 'trainer3@gmail.com', '+49 173 555 6655', '$2a$12$Dtxg0eQ0385c2YG/ZFjywelWD8WdQVHXary/BCgbBwYRezmgqbt82', 'Trainer', '2025-04-15T10:22:37.239Z', '2025-04-17T10:41:36.685Z');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `dokuments`
--

CREATE TABLE `dokuments` (
  `id` int(11) NOT NULL,
  `senderid` int(11) NOT NULL,
  `titel` varchar(255) NOT NULL,
  `kategorie` enum('Protokol','Rechtliches','Sonstiges') NOT NULL,
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
(1, 1, 'Dokument 1', 'Protokol', 'PDF', NULL, '', '2025-04-15', '2025-04-15T13:25:13.896Z', NULL, 'https://drive.google.com/file/d/1WD-hAhZLcy36mM6SamlXzjtlIP7fUtJp/view?usp=drive_link'),
(2, 1, 'Unsere Regeln', 'Rechtliches', 'PDF', NULL, '', '2025-04-18', '2025-04-15T13:26:34.721Z', NULL, 'https://drive.google.com/file/d/1WD-hAhZLcy36mM6SamlXzjtlIP7fUtJp/view?usp=drive_link'),
(3, 1, 'Checkliste für Jugendtrainer G- bis A-Jugend', 'Sonstiges', 'PDF', NULL, '', '2025-04-17', '2025-04-17T09:23:37.837Z', NULL, 'https://drive.google.com/file/d/1uaj1Qb1-k5f8FaBNFaJDn560oRB0mvDH/view?usp=sharing'),
(4, 1, 'Preisliste – Werbung', 'Sonstiges', 'PDF', NULL, '', '2025-04-17', '2025-04-17T09:24:31.205Z', NULL, 'https://drive.google.com/file/d/1L5VgqEASq3O75W8vUFhe-OT7Axx3-LzF/view?usp=sharing'),
(5, 1, 'Verhalten ggü. TSG Wieseck und FC Gießen', 'Protokol', 'Word', NULL, '', '2025-04-17', '2025-04-17T09:25:41.519Z', NULL, 'https://docs.google.com/document/d/1rMd-sS8UxaIHYKq-506d4KoyVXhKka6k/edit?usp=sharing&ouid=104730325324598729450&rtpof=true&sd=true');

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
(1, 1, 'Die App', 'Die App ist fast fertig.', 'Allgemein', '', '', '', 0, 'Active'),
(2, 1, 'Lorem ipsum', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 'Allgemein', '', '', '', 0, 'Inactive'),
(3, 1, 'Lorem', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 'Allgemein', '', '', '', 1, 'Active'),
(4, 1, 'Wettbewerb', '14 Mannschafte', 'Ereignis', '2025-04-16T09:00', '2025-04-16T17:00', 'Giessen', 1, 'Active'),
(5, 1, 'Platzbelegung', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.  \n\nDuis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.  \n\nUt wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.  \n\nNam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem', 'Allgemein', '', '', '', 1, 'Active'),
(6, 1, 'Osten', 'In der Zeit von 18 April 2025 bis 21 April 2025 ist der Sportplatz gesperrt.', 'Ereignis', '2025-04-18T00:00', '2025-04-21T23:59', 'Langgöns', 1, 'Active');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereins`
--

CREATE TABLE `vereins` (
  `id` int(11) NOT NULL,
  `coachid` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `trainername` varchar(255) DEFAULT NULL,
  `telefon` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `beschreibung` text DEFAULT NULL,
  `zusatzinformation` text DEFAULT NULL,
  `regeln` text DEFAULT NULL,
  `istGegner` tinyint(1) NOT NULL,
  `gegnerid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `vereins`
--

INSERT INTO `vereins` (`id`, `coachid`, `name`, `trainername`, `telefon`, `email`, `adresse`, `beschreibung`, `zusatzinformation`, `regeln`, `istGegner`, `gegnerid`) VALUES
(1, 2, 'Team 1', 'Eins Trainer 1', '+49 173 555 6655', 'trainer1@gmail.com', '', '', '', '', 0, NULL),
(2, 4, 'Team 5', 'Drei Trainer 3', '+49 173 555 6655', 'trainer3@gmail.com', '', '', '', '', 0, NULL),
(3, 2, 'Team A', 'Herr Klaus', '+45 885 555 5555', '', '', '- ist immer pünktlich\n- hat eine große Mannschaft, er braucht mehr Platz für sein Team', '', '', 1, 1),
(4, 2, 'Team B', 'Herr Müller', '+49 834 364 98688', 'mueller@yahoo.de', 'rosalinastrasse 177, 75855 Berlin', '- kommt immer früher', '', '', 1, 1),
(5, 4, 'Team K', 'Tommy Schneider', '+49 834 364 98688', 'tommyschneider@gmail.com', 'luisenstrasse 10, 35390 Giessen', '- Der Trainer ist für den Moment krank\n- Keinen Kunstplatz', '', '', 1, 2),
(6, 4, 'Team G', 'Mike Moneli', '+45 885 555 5555', 'mikemoneli@gmail.com', 'sandstrasse 18, 75862 Dortmund', '- wenige Spieler in der Mannschaft\n- trainiert 4 mal pro Woche\n- ist ab Januar im Urlaub', '', '', 1, 2),
(7, 2, 'Team Test', 'Trainer 1 Eins', '+49 173 555 6655', 'trainertest@gmail.com', '', '', '', '', 0, NULL),
(8, 2, 'Gegner Test', 'Sarah Witz', '+49 173 555 6655', '', '', '- sehr pünktlich', '', '', 1, 7);

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
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `dokuments`
--
ALTER TABLE `dokuments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `information`
--
ALTER TABLE `information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `vereins`
--
ALTER TABLE `vereins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `vereins`
--
ALTER TABLE `vereins`
  ADD CONSTRAINT `vereins_ibfk_1` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_10` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_11` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_12` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_13` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_14` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_15` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_16` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_17` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_18` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_19` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_2` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_20` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_21` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_22` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_23` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_24` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_25` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_26` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_27` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_28` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_3` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_4` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_5` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_6` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_7` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_8` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vereins_ibfk_9` FOREIGN KEY (`coachid`) REFERENCES `benutzers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
