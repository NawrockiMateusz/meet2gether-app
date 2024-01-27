CREATE OR REPLACE FUNCTION checkValidEmail()
RETURNS TRIGGER AS $$
BEGIN
	IF NEW.Email NOT LIKE '%@%.%' THEN
		RAISE EXCEPTION 'Invalid Email: % -> Correct pattern: %%@%%.%%', NEW.Email;
	END IF;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER preventInvalidEmail
BEFORE INSERT OR UPDATE ON Users
FOR EACH ROW
EXECUTE FUNCTION checkValidEmail();