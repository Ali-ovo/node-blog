-- use myblog;

-- show tables;
-- insert into users (username, `password`, realname) values ("ali22", "123", "阿离22");

-- select * from users;
-- select id,username from users;
-- select * from users where username like "%a%" and `password`="456"
-- select * from users order by id desc

-- update users set realname="阿离" where username="ali";
-- delete from users where username="ali22"

-- select * from users where state="1";
-- select * from users where state<>"0";
-- update users set state="0" where username="ali";

-- SET SQL_SAFE_UPDATES = 0;



-- insert into blogs(title, content, createtime, author) values ('标题B', '内容B', 167516689992, 'ali');
-- select * from blogs where title like "%标题%" order by createtime desc;

-- select * from users;
-- select * from blogs;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'wzy2580.';
-- flush privileges;