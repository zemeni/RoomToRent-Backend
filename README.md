# Install Postgresql in Ubuntu
sudo apt install postgresql

# Check postgresql status
sudo service postgresql status

# Check postgresql status
sudo systemctl enable postgresql.service

# Start Postgresql server
sudo systemctl start postgresql.service


# Getting started with postgres
sudo -i -u postgres (this user doesn't have password)
# Enter new password for user postgres
sudo -i -u postgres
psql
postgres=#\password postgres
## now exit and start like this
psql -h localhost -d postgres
password: new_password

# backup
pg_dump -U your_username -h your_host -p your_port -d your_database_name -f backup_full.sql
# restore
psql -U your_username -h your_host -p your_port -d new_database_name -f backup_schema.sql
