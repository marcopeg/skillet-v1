DROP TRIGGER IF EXISTS "set_public_res_values_updated_at" ON "public"."res_values";
ALTER TABLE "public"."res_values" DROP COLUMN "updated_at";
