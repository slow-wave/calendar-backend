CREATE USER 'diary_api'@'%' IDENTIFIED by '1234';
GRANT ALL PRIVILEGES ON diary_system.* to 'diary_api'@'%';
ALTER USER 'diary_api'@'%' IDENTIFIED WITH mysql_native_password BY '1234';

flush privileges;