TRUNCATE "projects" CASCADE;

SET session_replication_role = replica;
-- Adminer 4.7.6 PostgreSQL dump

INSERT INTO "entries" ("project_id", "prop_value_id", "res_value_id", "updated_at", "description", "value") VALUES
('Lk3on9',	1,	1,	'2020-10-11 13:27:36.680298+00',	'',	60),
('Lk3on9',	6,	2,	'2020-10-11 13:32:41.178082+00',	'',	60),
('Lk3on9',	5,	1,	'2020-10-11 18:54:30.077977+00',	'',	40),
('Lk3on9',	2,	1,	'2020-10-11 18:59:08.642137+00',	'',	40),
('Lk3on9',	4,	1,	'2020-10-11 18:59:09.699661+00',	'',	80),
('Lk3on9',	6,	1,	'2020-10-11 18:59:31.152673+00',	'',	40);

INSERT INTO "entries_history" ("created_at", "project_id", "prop_value_id", "res_value_id", "value", "description") VALUES
('2020-10-11 13:26:44.366791+00',	'Lk3on9',	6,	1,	80,	''),
('2020-10-11 13:26:46.572935+00',	'Lk3on9',	5,	1,	40,	''),
('2020-10-11 13:26:50.565511+00',	'Lk3on9',	2,	1,	40,	''),
('2020-10-11 13:27:34.261325+00',	'Lk3on9',	4,	1,	80,	''),
('2020-10-11 13:27:36.680298+00',	'Lk3on9',	1,	1,	60,	''),
('2020-10-11 13:27:41.830595+00',	'Lk3on9',	5,	1,	40,	''),
('2020-10-11 13:27:45.089901+00',	'Lk3on9',	6,	1,	80,	''),
('2020-10-11 13:28:10.713642+00',	'Lk3on9',	6,	1,	0,	''),
('2020-10-11 13:32:41.178082+00',	'Lk3on9',	6,	2,	60,	''),
('2020-10-11 18:54:19.601649+00',	'Lk3on9',	6,	1,	40,	''),
('2020-10-11 18:54:22.641007+00',	'Lk3on9',	5,	1,	40,	''),
('2020-10-11 18:54:30.077977+00',	'Lk3on9',	5,	1,	40,	''),
('2020-10-11 18:59:08.642137+00',	'Lk3on9',	2,	1,	40,	''),
('2020-10-11 18:59:09.699661+00',	'Lk3on9',	4,	1,	80,	''),
('2020-10-11 18:59:31.152673+00',	'Lk3on9',	6,	1,	40,	'');

INSERT INTO "projects" ("id", "title", "description", "created_at", "updated_at", "is_private", "settings") VALUES
('m4ouHa',	'Empty Project',	'',	'2020-10-13 08:16:16.273259+00',	'2020-10-13 08:16:16.273259+00',	'f',	'{}'),
('S3iOla',	'One Cell Project',	'',	'2020-10-13 08:16:30.579201+00',	'2020-10-13 08:18:47.828685+00',	'f',	'{}'),
('Lk3on9',	'Test1',	'',	'2020-10-06 09:13:52.575134+00',	'2020-10-13 08:19:03.894266+00',	'f',	'{}');

INSERT INTO "prop_groups" ("id", "project_id", "name", "description", "order", "updated_at", "settings") VALUES
(1,	'Lk3on9',	'Group1',	'',	0,	'2020-10-06 09:14:16.324492+00',	'{}'),
(2,	'Lk3on9',	'Group2',	'',	0,	'2020-10-10 10:04:37.349721+00',	'{"question": {"type": "stars"}}'),
(3,	'S3iOla',	'Team1',	'',	0,	'2020-10-13 08:16:55.151159+00',	'{}');

INSERT INTO "prop_values" ("id", "project_id", "prop_group_id", "name", "description", "tags", "order", "updated_at", "settings") VALUES
(1,	'Lk3on9',	1,	'Skill1',	'',	'{}',	0,	'2020-10-06 09:14:22.432932+00',	'{}'),
(2,	'Lk3on9',	1,	'Skill2',	'',	'{}',	0,	'2020-10-06 09:14:27.301741+00',	'{}'),
(4,	'Lk3on9',	2,	'Skill3',	'',	'{}',	0,	'2020-10-06 09:14:55.08162+00',	'{}'),
(5,	'Lk3on9',	2,	'Skill4',	'',	'{}',	0,	'2020-10-06 09:48:40.553385+00',	'{"thresholds": {"_null": {"label": "0000", "style": {"backgroundColor": "#fff1d4"}}, "values": [{"label": "v1", "style": {"backgroundColor": "#fff"}, "value": 0}, {"label": "a", "style": {"backgroundColor": "#e6f3ea"}, "value": 20}, {"label": "b", "style": {"backgroundColor": "#cee6d4"}, "value": 40}, {"label": "c", "style": {"backgroundColor": "#b5dabf"}, "value": 60}, {"label": "d", "style": {"backgroundColor": "#9dcdaa"}, "value": 80}, {"label": "e", "style": {"backgroundColor": "#84c195"}, "value": 100}]}}'),
(6,	'Lk3on9',	2,	'Skill5',	'',	'{}',	0,	'2020-10-06 18:31:18.593167+00',	'{}'),
(39,	'S3iOla',	3,	'Dev1',	'',	'{}',	0,	'2020-10-13 08:17:01.363194+00',	'{}');

INSERT INTO "res_groups" ("id", "project_id", "name", "description", "order", "updated_at") VALUES
(1,	'Lk3on9',	'Team1',	'',	0,	'2020-10-06 09:14:00.358052+00'),
(2,	'S3iOla',	'Group1',	'',	0,	'2020-10-13 08:16:39.686797+00');

INSERT INTO "res_values" ("id", "project_id", "res_group_id", "name", "description", "tags", "order", "updated_at") VALUES
(1,	'Lk3on9',	1,	'Dev1',	'',	'{}',	0,	'2020-10-06 09:14:05.663246+00'),
(2,	'Lk3on9',	1,	'Dev2',	'',	'{}',	0,	'2020-10-06 09:14:09.288884+00'),
(3,	'S3iOla',	2,	'Skill1',	'',	'{}',	0,	'2020-10-13 08:16:46.23322+00');

-- 2020-10-13 08:38:20.28569+00
SET session_replication_role = DEFAULT;