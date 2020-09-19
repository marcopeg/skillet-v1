CREATE TABLE "public"."res_values"(
  "id" serial NOT NULL, 
  "project_id" varchar(20) NOT NULL, 
  "res_group_id" integer NOT NULL, 
  "name" varchar(80) NOT NULL, 
  "description" text NOT NULL DEFAULT '', 
  "tags" text[] NOT NULL DEFAULT '{}', 
  "order" integer NOT NULL DEFAULT 0, 
  PRIMARY KEY ("id") , 
  FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON UPDATE cascade ON DELETE cascade, 
  FOREIGN KEY ("res_group_id") REFERENCES "public"."res_groups"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("id")
);
