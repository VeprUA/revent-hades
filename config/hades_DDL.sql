CREATE TABLE message
(
    messageId INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT,
    user VARCHAR,
    dateCreated DATETIME DEFAULT TIMESTAMP NOT NULL,
    isError INTEGER DEFAULT 1 NOT NULL,
    comment TEXT,
    tags VARCHAR,
    appName VARCHAR
);

CREATE INDEX messages_user_index ON messages (user);
CREATE INDEX messages_tags_index ON messages (tags);
CREATE INDEX messages_appName_index ON messages (appName)