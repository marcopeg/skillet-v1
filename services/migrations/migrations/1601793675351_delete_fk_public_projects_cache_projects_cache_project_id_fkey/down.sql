alter table "public"."projects_cache" add foreign key ("project_id") references "public"."projects"("id") on update cascade on delete cascade;
