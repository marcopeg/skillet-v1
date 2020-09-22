create or replace view public.projects_public_list as 
select id, title, description, created_at, updated_at from public.projects 
where is_private = false order by updated_at desc limit 50;
