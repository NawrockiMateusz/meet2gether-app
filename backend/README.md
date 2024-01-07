# Instrukcja API Autentykacji Użytkownika

## Wymagania Wstępne
pip install -r requirements.txt
cd backend_django
python manage.py migrate
python manage.py runserver

## Rejestracja

POST /api/register/
### Body
Content-Type: application/json

```json
{
    "username": "user",
    "email": "user@example.com",
    "password": "password"
}
```
### Example
curl -X POST -H "Content-Type: application/json" -d '{"username": "newuser", "email": "user@example.com", "password": "yoursecurepassword"}' http://localhost:8000/api/register/

## Logowanie

POST /api/login/
Content-Type: application/json

{
    "username": "user",
    "password": "password"
}
## Example
curl -X POST -H "Content-Type: application/json" -d '{"username": "user", "password": "password"}' http://localhost:8000/api/login/


## Wylogowanie

POST /api/logout/
Content-Type: application/json

## Body
Brak.
