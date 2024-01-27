# Informacje na temat bazy danych

## Baza Danych

Baza danych PostgreSQL została zaimplementowana w chmurze na serwerze ElephantSQL.

## Parametry połączenia

Dostępne dla uprawnionych użytkowników w Trello: [Link do Trello](https://trello.com/c/qmU4sR6e)

## Struktura bazy danych

Struktura bazy danych (tabele, relacje, funkcje, triggery) odpowiada załączonym źródłom:
createSchema.sql, createTables.sql, preventInvalidEmail.sql i preventPlainPassword.sql

## Użycie

Załączony skrypt connection_to_database_test.py pokazuje sposób połączenia się z bazą i wykonaywanie podstawowych operacji SELECT, INSERT i DELETE.
Wymagane biblioteki: psycopg2 (do połączenia z bazą danych) oraz hashlib (do hashowania haseł)
