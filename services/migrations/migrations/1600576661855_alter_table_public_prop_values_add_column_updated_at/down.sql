DROP TRIGGER IF EXISTS "set_public_prop_values_updated_at" ON "public"."prop_values";
ALTER TABLE "public"."prop_values" DROP COLUMN "updated_at";
