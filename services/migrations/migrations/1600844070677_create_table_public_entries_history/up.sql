CREATE TABLE "public"."entries_history"(
  "created_at" timestamptz NOT NULL DEFAULT now(), 
  "project_id" varchar(20) NOT NULL, 
  "prop_value_id" integer NOT NULL, 
  "res_value_id" integer NOT NULL, 
  "value" int2 NOT NULL, 
  "description" text NOT NULL, 
  PRIMARY KEY ("created_at", "prop_value_id","res_value_id") , 
  FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("prop_value_id") REFERENCES "public"."prop_values"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("res_value_id") REFERENCES "public"."res_values"("id") ON UPDATE cascade ON DELETE cascade);


-- COLLECT HISTORY AFER AN ENTRY UPDATES
CREATE OR REPLACE FUNCTION "public"."append_entry_history"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;

  INSERT INTO "public"."entries_history" VALUES (
    _new.updated_at,
    _new.project_id,
    _new.prop_value_id,
    _new.res_value_id,
    _new.value,
    _new.description
  );

  RETURN _new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "append_entries_history_on_create_on_update"
AFTER INSERT OR UPDATE ON "public"."entries"
FOR EACH ROW
EXECUTE PROCEDURE "public"."append_entry_history"();

-- CLEAN HISTORY AFTER AN ENTRY IS DELETED
CREATE OR REPLACE FUNCTION "public"."cleanup_entry_history"()
RETURNS TRIGGER AS $$
DECLARE
  _old record;
BEGIN
  _old := OLD;

  DELETE FROM "public"."entries_history" 
  WHERE prop_value_id = _old.prop_value_id
    AND res_value_id = _old.res_value_id
    AND project_id = _old.project_id
  ;

  RETURN _old;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "cleanup_entries_history_on_delete"
AFTER DELETE ON "public"."entries"
FOR EACH ROW
EXECUTE PROCEDURE "public"."cleanup_entry_history"();