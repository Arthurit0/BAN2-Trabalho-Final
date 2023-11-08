-- Criação do esquema público após limpar o esquema existente
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

-- Criação das tabelas
CREATE TABLE enderecos (
    cd_endereco serial PRIMARY KEY,
    nm_rua varchar(100),
    nr_casa int,
    nm_bairro varchar(100),
    nm_cidade varchar(100),
    nm_estado varchar(100),
    nm_pais varchar(100),
    ds_telefone varchar(20)
);

CREATE TABLE autores (
    cd_autor serial PRIMARY KEY
);

CREATE TABLE musicos (
    nr_reg serial PRIMARY KEY,
    cd_endereco int,
    cd_autor int NOT NULL,
    nm_musico varchar(100) NOT NULL,
    nm_artistico varchar(50),
    CONSTRAINT endereco_fk FOREIGN KEY (cd_endereco) REFERENCES enderecos(cd_endereco) ON DELETE SET NULL,
    CONSTRAINT autor_fk FOREIGN KEY (cd_autor) REFERENCES autores(cd_autor) ON DELETE CASCADE
);

CREATE TABLE bandas (
    cd_banda serial PRIMARY KEY,
    cd_autor int NOT NULL,
    nm_banda varchar(100) NOT NULL,
    dt_formacao date,
    CONSTRAINT autor_fk FOREIGN KEY (cd_autor) REFERENCES autores(cd_autor) ON DELETE CASCADE
);

CREATE TABLE musicos_em_banda (
    nr_reg int NOT NULL,
    cd_banda int NOT NULL,
    CONSTRAINT musico_fk FOREIGN KEY (nr_reg) REFERENCES musicos(nr_reg) ON DELETE CASCADE,
    CONSTRAINT banda_fk FOREIGN KEY (cd_banda) REFERENCES bandas(cd_banda) ON DELETE CASCADE
);

CREATE TABLE musicas(
    cd_musica serial PRIMARY KEY,
    ds_titulo varchar(100) NOT NULL,
    ds_genero varchar(50),
    tp_duracao int,
    fmt_arquivo varchar(5)
);

CREATE TABLE autores_da_musica(
    cd_autor int NOT NULL,
    cd_musica int NOT NULL,
    CONSTRAINT autor_fk FOREIGN KEY (cd_autor) REFERENCES autores(cd_autor) ON DELETE CASCADE,
    CONSTRAINT musica_fk FOREIGN KEY (cd_musica) REFERENCES musicas(cd_musica) ON DELETE CASCADE
);

CREATE TABLE estudios(
    cd_estudio serial PRIMARY KEY,
    cd_endereco int NOT NULL,
    nm_estudio varchar(100) NOT NULL,
    CONSTRAINT endereco_fk FOREIGN KEY (cd_endereco) REFERENCES enderecos(cd_endereco) ON DELETE SET NULL
);

CREATE TABLE discos(
    cd_disco serial PRIMARY KEY,
    cd_autor int NOT NULL,
    cd_local_gravacao int,
    dt_grav date NOT NULL,
    ds_titulo varchar(100) NOT NULL,
    CONSTRAINT autor_fk FOREIGN KEY (cd_autor) REFERENCES autores(cd_autor) ON DELETE CASCADE,
    CONSTRAINT local_gravacao_fk FOREIGN KEY (cd_local_gravacao) REFERENCES estudios(cd_estudio) ON DELETE SET NULL
);

CREATE TABLE musicas_em_disco(
    cd_disco int NOT NULL,
    cd_musica int NOT NULL,
    CONSTRAINT disco_fk FOREIGN KEY (cd_disco) REFERENCES discos(cd_disco) ON DELETE CASCADE,
    CONSTRAINT musica_fk FOREIGN KEY (cd_musica) REFERENCES musicas(cd_musica)
);

CREATE TABLE instrumentos (
    cd_instrumento serial PRIMARY KEY,
    cd_estudio int NOT NULL,
    nm_instr varchar(25) NOT NULL,
    tip_instr varchar(25),
    nm_marca varchar(50),
    CONSTRAINT estudio_fk FOREIGN KEY (cd_estudio) REFERENCES estudios(cd_estudio) ON DELETE CASCADE
);

CREATE TABLE toca_instr (
    cd_instrumento int NOT NULL,
    nr_reg int NOT NULL,
    dt_uso date NOT NULL,
    CONSTRAINT instr_fk FOREIGN KEY (cd_instrumento) REFERENCES instrumentos(cd_instrumento) ON DELETE CASCADE,
    CONSTRAINT musico_fk FOREIGN KEY (nr_reg) REFERENCES musicos(nr_reg) ON DELETE CASCADE
);

-- Função para criação de autor
CREATE OR REPLACE FUNCTION cria_autor()
RETURNS INTEGER AS $$
DECLARE
    novo_cd_autor INTEGER;
BEGIN
    INSERT INTO autores DEFAULT VALUES RETURNING cd_autor INTO novo_cd_autor;
    RETURN novo_cd_autor;
END;
$$ LANGUAGE plpgsql;


INSERT INTO enderecos (nm_rua, nr_casa, nm_bairro, nm_cidade, nm_estado, nm_pais, ds_telefone) VALUES
('Rua A', 10, 'Bairro X', 'Cidade Y', 'Estado Z', 'País W', '12345678'),
('Avenida B', 20, 'Bairro X', 'Cidade Y', 'Estado Z', 'País W', '23456789'),
('Travessa C', 30, 'Bairro X', 'Cidade Y', 'Estado Z', 'País W', '34567890'),
('Alameda D', 40, 'Bairro X', 'Cidade Y', 'Estado Z', 'País W', '45678901');

SELECT cria_autor();
SELECT cria_autor();
SELECT cria_autor();
SELECT cria_autor();

INSERT INTO musicos (cd_endereco, cd_autor, nm_musico, nm_artistico) VALUES
(1, 1, 'Musico A', 'Artista A'),
(2, 2, 'Musico B', 'Artista B'),
(3, 3, 'Musico C', 'Artista C'),
(4, 4, 'Musico D', 'Artista D');

SELECT cria_autor();
SELECT cria_autor();
SELECT cria_autor();
SELECT cria_autor();

INSERT INTO bandas (cd_autor, nm_banda, dt_formacao) VALUES
(5, 'Banda E', '2000-01-01'),
(6, 'Banda F', '2001-02-02'),
(7, 'Banda G', '2002-03-03'),
(8, 'Banda H', '2003-04-04');

INSERT INTO musicos_em_banda (nr_reg, cd_banda) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

INSERT INTO musicas (ds_titulo, ds_genero, tp_duracao, fmt_arquivo) VALUES
('Musica I', 'Rock', 210, 'mp3' ),
('Musica J', 'Pop', 220, 'mp3'),
('Musica K', 'Jazz', 230, 'wav'),
('Musica L', 'Clássico', 240, 'wav');


INSERT INTO autores_da_musica (cd_autor, cd_musica) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

INSERT INTO estudios (cd_endereco, nm_estudio) VALUES
(1, 'Estudio U'),
(2, 'Estudio V'),
(3, 'Estudio W'),
(4, 'Estudio X');

INSERT INTO discos (cd_autor, cd_local_gravacao, dt_grav, ds_titulo) VALUES
(1, 1, '2022-01-01', 'Disco Y'),
(2, 2, '2022-02-02', 'Disco Z'),
(3, 3, '2022-03-03', 'Disco AA'),
(4, 4, '2022-04-04', 'Disco BB');

INSERT INTO musicas_em_disco (cd_disco, cd_musica) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4);

INSERT INTO instrumentos (cd_estudio, nm_instr, tip_instr, nm_marca) VALUES
(1, 'Guitarra', 'Corda', 'Fender'),
(2, 'Baixo', 'Corda', 'Gibson'),
(3, 'Bateria', 'Percussão', 'Yamaha'),
(4, 'Teclado', 'Percussão', 'Roland');

INSERT INTO toca_instr (cd_instrumento, nr_reg, dt_uso) VALUES
(1, 1, '2022-05-05'),
(2, 2, '2022-06-06'),
(3, 3, '2022-07-07'),
(4, 4, '2022-08-08');
