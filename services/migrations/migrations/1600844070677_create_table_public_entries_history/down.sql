DROP TRIGGER IF EXISTS "cleanup_entries_history_on_delete" ON "public"."entries";
DROP TRIGGER IF EXISTS "append_entries_history_on_create_on_update" ON "public"."entries";
DROP FUNCTION IF EXISTS "public"."cleanup_entry_history";
DROP FUNCTION IF EXISTS "public"."append_entry_history";
DROP TABLE "public"."entries_history";
