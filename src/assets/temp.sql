INSERT INTO benutzers (id, nachname, vorname, email, passwort, rolle, erstellungsdatum, letzterLogin)
VALUES
  (1, 'test11', 'test11', 'test11@test.com', 'test11', 'Administrator', '2022-01-01', '2025-01-01'),
  (2, 'test22', 'test22', 'test22@test22.com', 'test22', 'Trainer', '2023-02-15', '2025-01-01'),
  (3, 'test33', 'test33', 'test33@test33.com', 'test33', 'Trainer', '2023-03-01', '2025-01-01'),
  (4, 'test44', 'test44', 'test44@test44.com', 'test44', 'Trainer', '2023-04-01', '2025-01-01'),
  (5, 'test55', 'test55', 'test55@test55.com', 'test55', 'Administrator', '2023-05-01', '2025-01-01');


INSERT INTO dokuments (senderid, titel, kategorie, type, bild, gueltigab, erstelldatum, url) 
VALUES 
(1, 'Document 1', 'Protokol', 'PDF', 'JPG', '2025-03-01', '2025-03-01', 'url1.com'),
(2, 'Document 2', 'Rechtliches', 'Word', 'PNG', '2025-03-02', '2025-03-02', 'url2.com'),
(3, 'Document 3', 'Anderes', 'Bild', 'JPG', '2025-03-03', '2025-03-03', 'url3.com'),
(4, 'Document 4', 'Protokol', 'PDF', 'JPG', '2025-03-04', '2025-03-04', 'url4.com'),
(5, 'Document 5', 'Rechtliches', 'Word', 'PNG', '2025-03-05', '2025-03-05', 'url5.com'),
(6, 'Document 6', 'Anderes', 'Bild', 'JPG', '2025-03-06', '2025-03-06', 'url6.com'),
(7, 'Document 7', 'Protokol', 'PDF', 'PNG', '2025-03-07', '2025-03-07', 'url7.com'),
(8, 'Document 8', 'Rechtliches', 'Word', 'JPG', '2025-03-08', '2025-03-08', 'url8.com'),
(9, 'Document 9', 'Anderes', 'Bild', 'PNG', '2025-03-09', '2025-03-09', 'url9.com'),
(10, 'Document 10', 'Protokol', 'PDF', 'JPG', '2025-03-10', '2025-03-10', 'url10.com'),
(11, 'Document 11', 'Rechtliches', 'Word', 'PNG', '2025-03-11', '2025-03-11', 'url11.com'),
(12, 'Document 12', 'Anderes', 'Bild', 'JPG', '2025-03-12', '2025-03-12', 'url12.com'),
(13, 'Document 13', 'Protokol', 'PDF', 'JPG', '2025-03-13', '2025-03-13', 'url13.com'),
(14, 'Document 14', 'Rechtliches', 'Word', 'PNG', '2025-03-14', '2025-03-14', 'url14.com'),
(15, 'Document 15', 'Anderes', 'Bild', 'JPG', '2025-03-15', '2025-03-15', 'url15.com');


INSERT INTO Information (senderId, titel, beschreibung, kategorie, startdatum, enddatum, ort, wichtig, status) 
VALUES
(1, 'Info 1', 'Description de l\'information 1', 'Allgemein', '2025-03-01', '2025-03-02', 'Lieu 1', TRUE, 'Active'),
(2, 'Info 2', 'Description de l\'information 2', 'Ereignis', '2025-03-02', '2025-03-03', 'Lieu 2', FALSE, 'Inactive'),
(3, 'Info 3', 'Description de l\'information 3', 'Allgemein', '2025-03-03', '2025-03-04', 'Lieu 3', TRUE, 'Active'),
(4, 'Info 4', 'Description de l\'information 4', 'Ereignis', '2025-03-04', '2025-03-05', 'Lieu 4', TRUE, 'Active'),
(5, 'Info 5', 'Description de l\'information 5', 'Allgemein', '2025-03-05', '2025-03-06', 'Lieu 5', FALSE, 'Inactive'),
(6, 'Info 6', 'Description de l\'information 6', 'Ereignis', '2025-03-06', '2025-03-07', 'Lieu 6', TRUE, 'Active'),
(7, 'Info 7', 'Description de l\'information 7', 'Allgemein', '2025-03-07', '2025-03-08', 'Lieu 7', FALSE, 'Inactive'),
(8, 'Info 8', 'Description de l\'information 8', 'Ereignis', '2025-03-08', '2025-03-09', 'Lieu 8', TRUE, 'Active'),
(9, 'Info 9', 'Description de l\'information 9', 'Allgemein', '2025-03-09', '2025-03-10', 'Lieu 9', FALSE, 'Inactive'),
(10, 'Info 10', 'Description de l\'information 10', 'Ereignis', '2025-03-10', '2025-03-11', 'Lieu 10', TRUE, 'Active'),
(11, 'Info 11', 'Description de l\'information 11', 'Allgemein', '2025-03-11', '2025-03-12', 'Lieu 11', FALSE, 'Inactive'),
(12, 'Info 12', 'Description de l\'information 12', 'Ereignis', '2025-03-12', '2025-03-13', 'Lieu 12', TRUE, 'Active'),
(13, 'Info 13', 'Description de l\'information 13', 'Allgemein', '2025-03-13', '2025-03-14', 'Lieu 13', TRUE, 'Active'),
(14, 'Info 14', 'Description de l\'information 14', 'Ereignis', '2025-03-14', '2025-03-15', 'Lieu 14', FALSE, 'Inactive'),
(15, 'Info 15', 'Description de l\'information 15', 'Allgemein', '2025-03-15', '2025-03-16', 'Lieu 15', TRUE, 'Active');


INSERT INTO vereins (coachid, name, telefon, email, adresse, istGegner) 
VALUES
(0, 'Opponent A1', '0123456794', 'oppA1f@example.com', 'Adresse 6', FALSE ),
(1, 'Opponent A2', '0123456795', 'oppA2f@example.com', 'Adresse 7', FALSE),
(2, 'Opponent A3', '0123456796', 'oppA3f@example.com', 'Adresse 8', FALSE ),
(1, 'Opponent A4', '0123456797', 'oppA4f@example.com', 'Adresse 9', FALSE ),
(2, 'Opponent A5', '0123456798', 'oppA5f@example.com', 'Adresse 10', FALSE );

-- Equipes adversaires pour Team A
INSERT INTO vereins (coachid, name, telefon, email, adresse, istGegner, gegnerIds) 
VALUES
(NULL, 'Opponent A1', '0123456794', 'oppA1@example.com', 'Adresse 6', TRUE, '[0]'),
(NULL, 'Opponent A2', '0123456795', 'oppA2@example.com', 'Adresse 7', TRUE, '[0]'),
(NULL, 'Opponent A3', '0123456796', 'oppA3@example.com', 'Adresse 8', TRUE, '[0]'),
(NULL, 'Opponent A4', '0123456797', 'oppA4@example.com', 'Adresse 9', TRUE, '[0]'),
(NULL, 'Opponent A5', '0123456798', 'oppA5@example.com', 'Adresse 10', TRUE, '[0]'),
(NULL, 'Opponent A6', '0123456799', 'oppA6@example.com', 'Adresse 11', TRUE, '[0]'),
(NULL, 'Opponent A7', '0123456800', 'oppA7@example.com', 'Adresse 12', TRUE, '[0]'),
(NULL, 'Opponent A8', '0123456801', 'oppA8@example.com', 'Adresse 13', TRUE, '[0]'),
(NULL, 'Opponent A9', '0123456802', 'oppA9@example.com', 'Adresse 14', TRUE, '[0]'),
(NULL, 'Opponent A10', '0123456803', 'oppA10@example.com', 'Adresse 15', TRUE, '[0]'),
(NULL, 'Opponent A11', '0123456804', 'oppA11@example.com', 'Adresse 16', TRUE, '[0]'),
(NULL, 'Opponent A12', '0123456805', 'oppA12@example.com', 'Adresse 17', TRUE, '[0]'),
(NULL, 'Opponent A13', '0123456806', 'oppA13@example.com', 'Adresse 18', TRUE, '[0]'),
(NULL, 'Opponent A14', '0123456807', 'oppA14@example.com', 'Adresse 19', TRUE, '[0]'),
(NULL, 'Opponent A15', '0123456810', 'oppA15@example.com', 'Adresse 20', TRUE, '[0]');

-- Equipes adversaires pour Team B
INSERT INTO vereins (coachid, name, telefon, email, adresse, istGegner, gegnerIds) 
VALUES
(NULL, 'Opponent B1', '0123456811', 'oppB1@example.com', 'Adresse 21', TRUE, '[1]'),
(NULL, 'Opponent B2', '0123456812', 'oppB2@example.com', 'Adresse 22', TRUE, '[1]'),
(NULL, 'Opponent B3', '0123456813', 'oppB3@example.com', 'Adresse 23', TRUE, '[1]'),
(NULL, 'Opponent B4', '0123456814', 'oppB4@example.com', 'Adresse 24', TRUE, '[1]'),
(NULL, 'Opponent B5', '0123456815', 'oppB5@example.com', 'Adresse 25', TRUE, '[1]'),
(NULL, 'Opponent B6', '0123456816', 'oppB6@example.com', 'Adresse 26', TRUE, '[1]'),
(NULL, 'Opponent B7', '0123456817', 'oppB7@example.com', 'Adresse 27', TRUE, '[1]'),
(NULL, 'Opponent B8', '0123456818', 'oppB8@example.com', 'Adresse 28', TRUE, '[1]'),
(NULL, 'Opponent B9', '0123456819', 'oppB9@example.com', 'Adresse 29', TRUE, '[1]'),
(NULL, 'Opponent B10', '0123456820', 'oppB10@example.com', 'Adresse 30', TRUE, '[1]'),
(NULL, 'Opponent B11', '0123456821', 'oppB11@example.com', 'Adresse 31', TRUE, '[1]'),
(NULL, 'Opponent B12', '0123456822', 'oppB12@example.com', 'Adresse 32', TRUE, '[1]'),
(NULL, 'Opponent B13', '0123456823', 'oppB13@example.com', 'Adresse 33', TRUE, '[1]'),
(NULL, 'Opponent B14', '0123456824', 'oppB14@example.com', 'Adresse 34', TRUE, '[1]'),
(NULL, 'Opponent B15', '0123456826', 'oppB15@example.com', 'Adresse 35', TRUE, '[1]');

-- Equipes adversaires pour Team C
INSERT INTO vereins (coachid, name, telefon, email, adresse, istGegner, gegnerIds) 
VALUES
(NULL, 'Opponent C1', '0123456827', 'oppC1@example.com', 'Adresse 36', TRUE, '[2]'),
(NULL, 'Opponent C2', '0123456828', 'oppC2@example.com', 'Adresse 37', TRUE, '[2]'),
(NULL, 'Opponent C3', '0123456829', 'oppC3@example.com', 'Adresse 38', TRUE, '[2]'),
(NULL, 'Opponent C4', '0123456830', 'oppC4@example.com', 'Adresse 39', TRUE, '[2]'),
(NULL, 'Opponent C5', '0123456831', 'oppC5@example.com', 'Adresse 40', TRUE, '[2]'),
(NULL, 'Opponent C6', '0123456832', 'oppC6@example.com', 'Adresse 41', TRUE, '[2]'),
(NULL, 'Opponent C7', '0123456833', 'oppC7@example.com', 'Adresse 42', TRUE, '[2]'),
(NULL, 'Opponent C8', '0123456834', 'oppC8@example.com', 'Adresse 43', TRUE, '[2]'),
(NULL, 'Opponent C9', '0123456835', 'oppC9@example.com', 'Adresse 44', TRUE, '[2]'),
(NULL, 'Opponent C10', '0123456836', 'oppC10@example.com', 'Adresse 45', TRUE, '[2]'),
(NULL, 'Opponent C11', '0123456837', 'oppC11@example.com', 'Adresse 46', TRUE, '[2]'),
(NULL, 'Opponent C12', '0123456838', 'oppC12@example.com', 'Adresse 47', TRUE, '[2]'),
(NULL, 'Opponent C13', '0123456839', 'oppC13@example.com', 'Adresse 48', TRUE, '[2]'),
(NULL, 'Opponent C14', '0123456840', 'oppC14@example.com', 'Adresse 49', TRUE, '[2]'),
(NULL, 'Opponent C15', '0123456841', 'oppC15@example.com', 'Adresse 50', TRUE, '[2]');