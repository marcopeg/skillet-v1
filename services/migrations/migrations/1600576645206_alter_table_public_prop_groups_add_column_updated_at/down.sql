DROP TRIGGER IF EXISTS "set_public_prop_groups_updated_at" ON "public"."prop_groups";
ALTER TABLE "public"."prop_groups" DROP COLUMN "updated_at";
