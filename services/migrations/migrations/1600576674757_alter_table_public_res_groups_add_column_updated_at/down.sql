DROP TRIGGER IF EXISTS "set_public_res_groups_updated_at" ON "public"."res_groups";
ALTER TABLE "public"."res_groups" DROP COLUMN "updated_at";
