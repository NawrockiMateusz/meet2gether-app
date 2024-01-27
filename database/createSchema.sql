CREATE SCHEMA IF NOT EXISTS meet2gether
    AUTHORIZATION wcvolspc;

COMMENT ON SCHEMA meet2gether
    IS 'Database schema for meet2gether application';

ALTER ROLE wcvolspc SET search_path TO meet2gether;