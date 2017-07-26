CREATE TABLE hades_messages.errors
(
    errorId INT PRIMARY KEY AUTO_INCREMENT,
    errorMessage VARCHAR(255) NOT NULL,
    userName VARCHAR(255) NOT NULL,
    userFullName VARCHAR(255),
    dateCreated TIMESTAMP,
    isError INT DEFAULT 1 NOT NULL,
    appName VARCHAR(255),
    comment TEXT
);
CREATE INDEX errors_appName_index ON hades_messages.errors (appName);
CREATE INDEX errors_userName_index ON hades_messages.errors (userName);
CREATE INDEX errors_dateCreated_index ON hades_messages.errors (dateCreated DESC);
CREATE INDEX errors_errorMessage_index ON hades_messages.errors (errorMessage);