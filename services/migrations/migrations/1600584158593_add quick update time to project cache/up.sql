-- FUNCTIONS
CREATE OR REPLACE FUNCTION "public"."project_cache_bump_updated_at_by_project_id_on_insert_update"()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE "public"."projects_cache" SET "updated_at" = NOW() WHERE "project_id" = NEW.project_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION "public"."project_cache_bump_updated_at_by_project_id_on_delete"()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE "public"."projects_cache" SET "updated_at" = NOW() WHERE "project_id" = OLD.project_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- ATTACH TRIGGER TO: ENTRIES
CREATE TRIGGER "entries_bumps_project_cache_on_insert_update"
AFTER INSERT OR UPDATE ON "public"."entries"
FOR EACH ROW
EXECUTE PROCEDURE "public"."project_cache_bump_updated_at_by_project_id_on_insert_update"();
COMMENT ON TRIGGER "entries_bumps_project_cache_on_insert_update" ON "public"."entries" 
IS 'Quickly forces an update on the project cache that will be propagated to the client as subscription';

CREATE TRIGGER "entries_bumps_project_cache_on_delete"
AFTER INSERT OR UPDATE ON "public"."entries"
FOR EACH ROW
EXECUTE PROCEDURE "public"."project_cache_bump_updated_at_by_project_id_on_delete"();
COMMENT ON TRIGGER "entries_bumps_project_cache_on_delete" ON "public"."entries" 
IS 'Quickly forces an update on the project cache that will be propagated to the client as subscription';

-- ATTACH TRIGGER TO: prop_groups
CREATE TRIGGER "prop_groups_bumps_project_cache_on_insert_update"
AFTER INSERT OR UPDATE ON "public"."prop_groups"
FOR EACH ROW
EXECUTE PROCEDURE "public"."project_cache_bump_updated_at_by_project_id_on_insert_update"();
COMMENT ON TRIGGER "prop_groups_bumps_project_cache_on_insert_update" ON "public"."prop_groups" 
IS 'Quickly forces an update on the project cache that will be propagated to the client as subscription';

CREATE TRIGGER "prop_groups_bumps_project_cache_on_delete"
AFTER INSERT OR UPDATE ON "public"."prop_groups"
FOR EACH ROW
EXECUTE PROCEDURE "public"."project_cache_bump_updated_at_by_project_id_on_delete"();
COMMENT ON TRIGGER "prop_groups_bumps_project_cache_on_delete" ON "public"."prop_groups" 
IS 'Quickly forces an update on the project cache that will be propagated to the client as subscription';

-- ATTACH TRIGGER TO: prop_values
CREATE TRIGGER "prop_values_bumps_project_cache_on_insert_update"
AFTER INSERT OR UPDATE ON "public"."prop_values"
FOR EACH ROW
EXECUTE PROCEDURE "public"."project_cache_bump_updated_at_by_project_id_on_insert_update"();
COMMENT ON TRIGGER "prop_values_bumps_project_cache_on_insert_update" ON "public"."prop_values" 
IS 'Quickly forces an update on the project cache that will be propagated to the client as subscription';

CREATE TRIGGER "prop_values_bumps_project_cache_on_delete"
AFTER INSERT OR UPDATE ON "public"."prop_values"
FOR EACH ROW
EXECUTE PROCEDURE "public"."project_cache_bump_updated_at_by_project_id_on_delete"();
COMMENT ON TRIGGER "prop_values_bumps_project_cache_on_delete" ON "public"."prop_values" 
IS 'Quickly forces an update on the project cache that will be propagated to the client as subscription';

-- ATTACH TRIGGER TO: res_groups
CREATE TRIGGER "res_groups_bumps_project_cache_on_insert_update"
AFTER INSERT OR UPDATE ON "public"."res_groups"
FOR EACH ROW
EXECUTE PROCEDURE "public"."project_cache_bump_updated_at_by_project_id_on_insert_update"();
COMMENT ON TRIGGER "res_groups_bumps_project_cache_on_insert_update" ON "public"."res_groups" 
IS 'Quickly forces an update on the project cache that will be propagated to the client as subscription';

CREATE TRIGGER "res_groups_bumps_project_cache_on_delete"
AFTER INSERT OR UPDATE ON "public"."res_groups"
FOR EACH ROW
EXECUTE PROCEDURE "public"."project_cache_bump_updated_at_by_project_id_on_delete"();
COMMENT ON TRIGGER "res_groups_bumps_project_cache_on_delete" ON "public"."res_groups" 
IS 'Quickly forces an update on the project cache that will be propagated to the client as subscription';

-- ATTACH TRIGGER TO: res_values
CREATE TRIGGER "res_values_bumps_project_cache_on_insert_update"
AFTER INSERT OR UPDATE ON "public"."res_values"
FOR EACH ROW
EXECUTE PROCEDURE "public"."project_cache_bump_updated_at_by_project_id_on_insert_update"();
COMMENT ON TRIGGER "res_values_bumps_project_cache_on_insert_update" ON "public"."res_values" 
IS 'Quickly forces an update on the project cache that will be propagated to the client as subscription';

CREATE TRIGGER "res_values_bumps_project_cache_on_delete"
AFTER INSERT OR UPDATE ON "public"."res_values"
FOR EACH ROW
EXECUTE PROCEDURE "public"."project_cache_bump_updated_at_by_project_id_on_delete"();
COMMENT ON TRIGGER "res_values_bumps_project_cache_on_delete" ON "public"."res_values" 
IS 'Quickly forces an update on the project cache that will be propagated to the client as subscription';