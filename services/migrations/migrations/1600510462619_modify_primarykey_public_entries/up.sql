alter table "public"."entries" drop constraint "entries_pkey";
alter table "public"."entries"
    add constraint "entries_pkey" 
    primary key ( "prop_value_id", "res_value_id" );
