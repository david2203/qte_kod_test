To initialiye this project you need to clone down this repository and then run following commands:
npm i node-sass
npm i react-router-dom
npm i axios

then you need to start the prject with:
npm start

After this you need to clone the repository for the backend called: 
qte_kod_test_backend 
and host this map inside MAMP in order to get access to phpmyadmin/mysql

in here please create a database called qte_code_test and then run following sql command:

DROP TABLE if exists Posts;
DROP TABLE if exists Comments;

CREATE TABLE Posts (
Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
PostAuthor VARCHAR(45) NOT NULL,
PostTitle VARCHAR(45) NOT NULL,
PostContent VARCHAR(300) NOT NULL
)
ENGINE = InnoDB;


CREATE TABLE Comments (
Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
CommentAuthor VARCHAR(45) NOT NULL,
CommentContent VARCHAR(300) NOT NULL,
PostId INT NOT NULL,
CONSTRAINT FK_Comments FOREIGN KEY(PostId) REFERENCES Posts(Id)
)
ENGINE = InnoDB;

Now you should be able to add posts and comments from the react app. 

If you run the backend via a diffrent localhost then localhost:8888, remember to change the config variable 
in src/components/config/config.tsx in order for the requests to work!

Enjoy :)