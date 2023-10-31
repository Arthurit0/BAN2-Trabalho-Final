--  Gatilho para garantir que cada disco pertence a um músico ou banda, mas não a ambos

CREATE OR REPLACE FUNCTION verifica_disco_proprietario()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.cod_autor IS NOT NULL THEN
    RAISE EXCEPTION 'Um disco não pode pertencer a um músico e uma banda simultaneamente';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER verifica_disco_proprietario_trigger
BEFORE INSERT OR UPDATE ON disco
FOR EACH ROW EXECUTE FUNCTION verifica_disco_proprietario();

-- Gatilho para garantir que cada música tenha pelo menos um autor

CREATE OR REPLACE FUNCTION verifica_autor_musica()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM autores_da_musica WHERE cod_musica = NEW.cod_musica) = 0 THEN
    RAISE EXCEPTION 'Cada música deve ter pelo menos um autor';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER verifica_autor_musica_trigger
AFTER INSERT OR DELETE ON autores_da_musica
FOR EACH ROW EXECUTE FUNCTION verifica_autor_musica();

-- Gatilho para garantir que cada disco tenha pelo menos uma música

CREATE OR REPLACE FUNCTION verifica_musica_disco()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM musicas_em_disco WHERE cod_disco = NEW.cod_disco) = 0 THEN
    RAISE EXCEPTION 'Cada disco deve ter pelo menos uma música';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER verifica_musica_disco_trigger
AFTER INSERT OR DELETE ON musicas_em_disco
FOR EACH ROW EXECUTE FUNCTION verifica_musica_disco();

-- Gatilho para que data de formação seja a data da inserção no banco se nenhuma dt_formacao for especificada

CREATE OR REPLACE FUNCTION atualiza_data_formacao()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.dt_formacao IS NULL THEN
    UPDATE banda SET dt_formacao = CURRENT_DATE WHERE cod_banda = NEW.cod_banda;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER atualiza_data_formacao_trigger
BEFORE INSERT OR UPDATE ON banda
FOR EACH ROW EXECUTE FUNCTION atualiza_data_formacao();
