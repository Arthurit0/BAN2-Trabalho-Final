DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE endereco (
	cd_end serial PRIMARY KEY,
	nm_rua varchar(100) NULL,
	nr_casa int NULL,
	nm_bairro varchar(100) NULL,
	nm_cidade varchar(100) NULL,
	nm_estado varchar(100) NULL,
	nm_pais varchar(100) NULL,
	ds_telefone varchar(20) NULL
);

CREATE TABLE autor (
	cd_autor serial PRIMARY KEY
);

CREATE TABLE musico (
	nr_reg serial PRIMARY KEY,
	cd_end int NULL, -- Relação Mora
	cd_autor int NOT NULL,
	nm_musico varchar(100) NOT NULL,
	nm_artistico varchar(50) NULL,
	CONSTRAINT endereco_fk FOREIGN KEY(cd_end) REFERENCES endereco(cd_end),
	CONSTRAINT autor_fk FOREIGN KEY(cd_autor) REFERENCES autor(cd_autor)
);

CREATE TABLE banda (
	cd_banda serial PRIMARY KEY,
	cd_autor int NOT NULL,
	nm_banda varchar(100) NOT NULL,
	dt_formacao date NULL,
	CONSTRAINT autor_fk FOREIGN KEY(cd_autor) REFERENCES autor(cd_autor)
);

-- Equivale ao "forma"
CREATE TABLE musico_em_banda (
	nr_reg int NOT NULL,
	cd_banda int NOT NULL,
	CONSTRAINT musico_fk FOREIGN KEY(nr_reg) REFERENCES musico(nr_reg),
	CONSTRAINT banda_fk FOREIGN KEY(cd_banda) REFERENCES banda(cd_banda)
);

CREATE TABLE musica(
	cd_musica serial PRIMARY KEY,
	ds_titulo varchar(100) NOT NULL,
	tp_duracao int NULL,
	fmt_arquivo varchar(5) NULL
);

-- Equivale ao "participa"
CREATE TABLE autores_da_musica(
	cd_autor int NOT NULL,
	cd_musica int NOT NULL,
	CONSTRAINT autor_fk FOREIGN KEY(cd_autor) REFERENCES autor(cd_autor),
	CONSTRAINT musica_fk FOREIGN KEY(cd_musica) REFERENCES musica(cd_musica)
);

CREATE TABLE produtor(
	cd_prod serial PRIMARY KEY,
	cd_end int NOT NULL,
	nm_produtor varchar(100) NOT NULL,
	nm_empresa varchar(100) NULL,
	CONSTRAINT endereco_fk FOREIGN KEY(cd_end) REFERENCES endereco(cd_end)
);

CREATE TABLE estudio(
	cd_studio serial PRIMARY KEY,
	cd_endereco int NOT NULL,
	nm_studio varchar(100) NOT NULL,
	CONSTRAINT endereco_fk FOREIGN KEY(cd_endereco) REFERENCES endereco(cd_end)
);

CREATE TABLE disco(
	cd_disco serial PRIMARY KEY,
	cd_autor int NOT NULL, -- Relação Grava
	cd_produtor int NOT NULL, -- Relação Produz
	cd_local_gravacao int NULL,
	dt_grav date NOT NULL,
	fmt_grav varchar(50) NULL,
	ds_titulo varchar(100) NOT NULL,
	CONSTRAINT autor_fk FOREIGN KEY(cd_autor) REFERENCES autor(cd_autor),
	CONSTRAINT produtor_fk FOREIGN KEY(cd_produtor) REFERENCES produtor(cd_prod),
	CONSTRAINT local_gravacao_fk FOREIGN KEY(cd_local_gravacao) REFERENCES estudio(cd_studio)
	);

-- Equivale ao "contem"
CREATE TABLE musicas_em_disco(
	cd_disco int NOT NULL,
	cd_musica int NOT NULL,
	CONSTRAINT disco_fk FOREIGN KEY(cd_disco) REFERENCES disco(cd_disco),
	CONSTRAINT musica_fk FOREIGN KEY(cd_musica) REFERENCES musica(cd_musica)
);

--CREATE TABLE local_gravacao(
--	cod_disco int NOT NULL,
--	cod_studio int NOT NULL,
--	dt_gravacao date NOT NULL,
--	CONSTRAINT disco_fk FOREIGN KEY(cod_disco) REFERENCES disco(cod_disco),
--	CONSTRAINT studio_fk FOREIGN KEY(cod_studio) REFERENCES estudio(cod_studio)
--);

CREATE TABLE instrumento (
	cd_instr serial PRIMARY KEY,
	cd_studio int NOT NULL, -- Relação Pertence
	nm_instr varchar(25) NOT NULL,
	tip_instr varchar(25) NULL,
	nm_marca varchar(50) NULL,
	CONSTRAINT estudio_fk FOREIGN KEY(cd_studio) REFERENCES estudio(cd_studio)
);

-- Equivale ao "toca"
CREATE TABLE toca_instr (
	cd_instr int NOT NULL,
	nr_reg int NOT NULL,
	dt_uso date NOT NULL,
	CONSTRAINT instr_fk FOREIGN KEY(cd_instr) REFERENCES instrumento(cd_instr),
	CONSTRAINT musico_fk FOREIGN KEY(nr_reg) REFERENCES musico(nr_reg) 
);