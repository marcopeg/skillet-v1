DROP TRIGGER IF EXISTS "entries_bumps_project_cache_on_insert_update" ON "public"."entries";
DROP TRIGGER IF EXISTS "entries_bumps_project_cache_on_delete" ON "public"."entries";

DROP TRIGGER IF EXISTS "prop_groups_bumps_project_cache_on_insert_update" ON "public"."prop_groups";
DROP TRIGGER IF EXISTS "prop_groups_bumps_project_cache_on_delete" ON "public"."prop_groups";

DROP TRIGGER IF EXISTS "prop_values_bumps_project_cache_on_insert_update" ON "public"."prop_values";
DROP TRIGGER IF EXISTS "prop_values_bumps_project_cache_on_delete" ON "public"."prop_values";

DROP TRIGGER IF EXISTS "res_groups_bumps_project_cache_on_insert_update" ON "public"."res_groups";
DROP TRIGGER IF EXISTS "res_groups_bumps_project_cache_on_delete" ON "public"."res_groups";

DROP TRIGGER IF EXISTS "res_values_bumps_project_cache_on_insert_update" ON "public"."res_values";
DROP TRIGGER IF EXISTS "res_values_bumps_project_cache_on_delete" ON "public"."res_values";

DROP FUNCTION IF EXISTS "public"."project_cache_bump_updated_at_by_project_id_on_insert_update";
DROP FUNCTION IF EXISTS "public"."project_cache_bump_updated_at_by_project_id_on_delete";