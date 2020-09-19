CREATE TABLE "public"."projects_cache"("project_id" varchar(20) NOT NULL, "data" jsonb NOT NULL, "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("project_id") , FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON UPDATE cascade ON DELETE cascade);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_projects_cache_updated_at"
BEFORE UPDATE ON "public"."projects_cache"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_projects_cache_updated_at" ON "public"."projects_cache" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
