drop table if exists users_groups;

drop table if exists messages;

DROP TABLE if exists users;

drop table if exists groups;

create table users (
    phone varchar(16) CONSTRAINT phone_regex CHeck (phone ~* '^\+972-5\d-\d{3}-\d{4}$') primary key,
    name text,
    password text,
    about text
);

create table groups (id smallint primary key, name text);

create table users_groups (
    user_phone varchar(16) NOT NULL,
    group_id smallint NOT NULL,
    PRIMARY KEY (user_phone, group_id),
    FOREIGN KEY (user_phone) REFERENCES users(phone) ON UPDATE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON UPDATE CASCADE
);

create table messages (
    id integer PRIMARY KEY,
    content text,
    sender varchar(16),
    group_id smallint NOT NULL,
    FOREIGN KEY (sender) REFERENCES users(phone) ON UPDATE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON UPDATE CASCADE
);

insert into
    users (phone, name)
Values
    ('+972-54-655-6666', 'bob');

insert into
    users (phone, name)
Values
    ('+972-54-695-6666', 'bub');

insert into
    groups (id, name)
Values
    ('1', 'bub');

insert into
    users_groups (user_phone, group_id)
Values
    ('+972-54-695-6666', '1');

insert into
    messages
Values
    ('1', 'hello', '+972-54-695-6666', '1');
