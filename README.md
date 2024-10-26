# backup
pg_dump -U your_username -h your_host -p your_port -d your_database_name -f backup_full.sql
# restore
psql -U your_username -h your_host -p your_port -d new_database_name -f backup_schema.sql
