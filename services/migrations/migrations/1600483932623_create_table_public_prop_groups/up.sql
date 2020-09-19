CREATE TABLE "public"."prop_groups"(
    "id" serial NOT NULL, 
    "project_id" varchar(20) NOT NULL, 
    "name" varchar(80) NOT NULL, 
    "description" text NOT NULL DEFAULT '', 
    "order" integer NOT NULL DEFAULT 0, 
    PRIMARY KEY ("id") , 
    FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON UPDATE cascade ON DELETE cascade
);
