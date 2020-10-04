-- fixes #36
-- fixes #32

CREATE OR REPLACE FUNCTION "public"."project_cache_bump_updated_at_by_project_id_on_insert_update"()
RETURNS TRIGGER AS $$
BEGIN

  INSERT INTO "projects_cache" VALUES (NEW.project_id, '{}')
  ON CONFLICT ON CONSTRAINT "projects_cache_pkey"
  DO UPDATE SET "updated_at" = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION "public"."project_cache_bump_updated_at_by_project_id_on_delete"()
RETURNS TRIGGER AS $$
BEGIN

  INSERT INTO "projects_cache" VALUES (OLD.project_id, '{}')
  ON CONFLICT ON CONSTRAINT "projects_cache_pkey"
  DO UPDATE SET "updated_at" = NOW();

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS "entries_bumps_project_cache_on_delete" ON "public"."entries";
CREATE TRIGGER "entries_bumps_project_cache_on_delete"
AFTER DELETE ON "public"."entries"
FOR EACH ROW
EXECUTE PROCEDURE "public"."project_cache_bump_updated_at_by_project_id_on_delete"();
COMMENT ON TRIGGER "entries_bumps_project_cache_on_delete" ON "public"."entries" 
IS 'Quickly forces an update on the project cache that will be propagated to the client as subscription';

DROP TRIGGER IF EXISTS "prop_groups_bumps_project_cache_on_delete" ON "public"."prop_groups";
CREATE TRIGGER "prop_groups_bumps_project_cache_on_delete"
AFTER DELETE ON "public"."prop_groups"
FOR EACH ROW
EXECUTE PROCEDURE "public"."project_cache_bump_updated_at_by_project_id_on_delete"();
COMMENT ON TRIGGER "prop_groups_bumps_project_cache_on_delete" ON "public"."prop_groups" 
IS 'Quickly forces an update on the project cache that will be propagated to the client as subscription';

DROP TRIGGER IF EXISTS "prop_values_bumps_project_cache_on_delete" ON "public"."prop_values";
CREATE TRIGGER "prop_values_bumps_project_cache_on_delete"
AFTER DELETE ON "public"."prop_values"
FOR EACH ROW
EXECUTE PROCEDURE "public"."project_cache_bump_updated_at_by_project_id_on_delete"();
COMMENT ON TRIGGER "prop_values_bumps_project_cache_on_delete" ON "public"."prop_values" 
IS 'Quickly forces an update on the project cache that will be propagated to the client as subscription';

DROP TRIGGER IF EXISTS "res_groups_bumps_project_cache_on_delete" ON "public"."res_groups";
CREATE TRIGGER "res_groups_bumps_project_cache_on_delete"
AFTER DELETE ON "public"."res_groups"
FOR EACH ROW
EXECUTE PROCEDURE "public"."project_cache_bump_updated_at_by_project_id_on_delete"();
COMMENT ON TRIGGER "res_groups_bumps_project_cache_on_delete" ON "public"."res_groups" 
IS 'Quickly forces an update on the project cache that will be propagated to the client as subscription';

DROP TRIGGER IF EXISTS "res_values_bumps_project_cache_on_delete" ON "public"."res_values";
CREATE TRIGGER "res_values_bumps_project_cache_on_delete"
AFTER DELETE ON "public"."res_values"
FOR EACH ROW
EXECUTE PROCEDURE "public"."project_cache_bump_updated_at_by_project_id_on_delete"();
COMMENT ON TRIGGER "res_values_bumps_project_cache_on_delete" ON "public"."res_values" 
IS 'Quickly forces an update on the project cache that will be propagated to the client as subscription';