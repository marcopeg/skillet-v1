CREATE TABLE "public"."prop_values"(
  "id" serial NOT NULL, 
  "project_id" varchar(20) NOT NULL, 
  "prop_group_id" integer NOT NULL, 
  "name" varchar(80) NOT NULL, 
  "description" text NOT NULL DEFAULT '', 
  "tags" text[] DEFAULT '{}',
  "order" integer NOT NULL DEFAULT 0, 
  PRIMARY KEY ("id") , 
  FOREIGN KEY ("prop_group_id") REFERENCES "public"."prop_groups"("id") ON UPDATE cascade ON DELETE cascade, 
  FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON UPDATE cascade ON DELETE cascade
);
