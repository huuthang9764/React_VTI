DROP DATABASE IF EXISTS `FinalExam`;
CREATE DATABASE IF NOT EXISTS `FinalExam`;
USE `FinalExam`;
DROP TABLE IF EXISTS `Account`;
CREATE TABLE IF NOT EXISTS `Account`(
		`id`					INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		`username`					VARCHAR(50) NOT NULL UNIQUE KEY,
		`password` 				VARCHAR(800) NOT NULL,
		`first_name`			NVARCHAR(50) NOT NULL,
		`last_name`				NVARCHAR(50) NOT NULL,
		`role` 					ENUM('USER','ADMIN') NOT NULL DEFAULT 'USER',
		`created_date`      	DATETIME DEFAULT NOW()
);

DROP TABLE IF EXISTS `Keyboard`;
CREATE TABLE IF NOT EXISTS `Keyboard`(
		`id`					INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		`name` 					NVARCHAR(255) NOT NULL,
		`brand` 				ENUM('LOGITECH', 'MSI', 'AKKO') NOT NULL,
        `price`					INT UNSIGNED NOT NULL,
		`created_date`			DATETIME DEFAULT NOW()
);      


INSERT INTO `Account`(	username		,						`password`									,	first_name	,	last_name		,		`role`		,		`created_date`				)
VALUES 				(	'dangblack'		,   '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	,	'Nguyen Hai'	,	'Dang'		,		'USER'		,		'2018-12-04'			),
					(	'quanganh'		,	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	,	'Nguyen Quang'	,	'Anh'		,		'ADMIN'		,		'2018-12-09'			),
                    (	'vanchien'		,	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	,	'Tran Van'		,	'Chien'		,		'USER'		,		'2018-10-04'			),
                    (	'cocoduongqua'	,	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	,	'Nguyen Co'		,	'Co'		,		'USER'		,		'2019-12-04'			),
                    (	'doccocaubai'	,   '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	,	'Nguyen Doc'	,	'Co'		,		'USER'		,		'2018-12-04'			),
                    (	'khabanh'		,   '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	,	'Phan Kha'		,	'Bang'		,		'USER'		,		'2020-04-04'			),
                    (	'huanhoahong'	,   '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	,	'Tran Van'		,	'Huan'		,		'USER'		,		'2022-01-26'			),
                    (	'tungnui'		,   '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	,	'Nguyen Tung'	,	'Nui'		,		'USER'		,		'2016-06-04'			),
                    (	'duongghuu'		,   '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	,	'Phan Duong'	,	'Huu'		,		'USER'		,		'2023-10-04'			),
                    (	'vtiaccademy'	,   '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	,	'Tran'			,	'Academy'	,		'ADMIN'		,		'2017-03-04'			),
					(	'thug24'		,   '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	,	'Ngo Tuan'		,	'Hung'		,		'ADMIN'		,		'2004-04-02'			);
             
INSERT INTO `Keyboard`  (`name`,                        `brand`,            `price`,    `created_date`) 
            VALUES 	    ('Logitech G6',                 'LOGITECH',          80,        '2023-11-01 10:00:00'),
                        ('MSI Pro',                     'MSI',               60,        '2023-11-02 11:30:00'),
                        ('Akko Neon',                   'AKKO',              100,       '2023-11-03 09:45:00'),
                        ('Logitech G Pro X',            'LOGITECH',          120,       '2023-11-04 14:20:00'),
                        ('MSI GK50',                    'MSI',               75,        '2023-11-05 08:15:00'),
                        ('Akko 3068',                   'AKKO',              90,        '2023-11-06 12:45:00'),
                        ('Logitech G513',               'LOGITECH',          150,       '2023-11-07 16:30:00'),
                        ('MSI Vigor GK30',              'MSI',               55,        '2023-11-08 10:10:00'),
                        ('Akko World Tour',             'AKKO',              110,       '2023-11-09 13:50:00'),
                        ('Logitech G Pro Wireless',     'LOGITECH',          150,       '2023-11-10 09:30:00'),
                        ('MSI GK61',                    'MSI',               80,        '2023-11-11 11:45:00'),
                        ('Akko 3087',                   'AKKO',              95,        '2023-11-12 14:20:00'),
                        ('Logitech G613',               'LOGITECH',          120,       '2023-11-13 16:15:00'),
                        ('MSI Vigor GK50 Elite',        'MSI',               70,        '2023-11-14 08:45:00'),
                        ('Akko 3061',                   'AKKO',              110,       '2023-11-15 12:30:00'),
                        ('Logitech G910 Orion Spectrum','LOGITECH',          160,       '2023-11-16 10:10:00'),
                        ('MSI Vigor GK30',              'MSI',               55,        '2023-11-17 13:50:00'),
                        ('Akko 3084',                   'AKKO',              100,       '2023-11-18 16:25:00');







