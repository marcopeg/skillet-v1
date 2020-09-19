CREATE TABLE "public"."entries"(
  "project_id" varchar(20) NOT NULL, 
  "prop_value_id" integer NOT NULL, 
  "res_value_id" integer NOT NULL, 
  "updated_at" timestamptz NOT NULL DEFAULT now(), 
  "description" text NOT NULL DEFAULT '', 
  "value" smallint DEFAULT 0,
  PRIMARY KEY ("project_id","res_value_id") , 
  FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON UPDATE cascade ON DELETE cascade, 
  FOREIGN KEY ("prop_value_id") REFERENCES "public"."prop_values"("id") ON UPDATE cascade ON DELETE cascade, 
  FOREIGN KEY ("res_value_id") REFERENCES "public"."res_values"("id") ON UPDATE cascade ON DELETE cascade
);


CREATE TRIGGER "set_public_entries_updated_at"
BEFORE UPDATE ON "public"."entries"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_entries_updated_at" ON "public"."entries" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
