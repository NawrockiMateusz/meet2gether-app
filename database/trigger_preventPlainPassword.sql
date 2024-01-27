CREATE OR REPLACE FUNCTION checkPassword()
RETURNS TRIGGER AS $$
BEGIN
	IF NEW.Password = OLD.Password THEN
		RAISE EXCEPTION 'New password must be different than old password';
	ELSIF NEW.Password !~ '^[a-f0-9]{64}$' THEN
		RAISE EXCEPTION 'Password must be hashed';
	END IF;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER preventPlainPassword
BEFORE INSERT OR UPDATE ON Users
FOR EACH ROW
EXECUTE FUNCTION checkPassword();