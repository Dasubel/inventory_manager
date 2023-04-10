# Welcome to your very own inventory manager!

First thing's first, create your account!  Once you have created your account with us,
you'll be able to create and then subsequently see the items that are in your inventory.

Shy? Don't want to create an account yet?  That's okay!  Take a look at all inventory
in the system as a visitor. (assuming someone has added inventory, the system did not come pre-stocked!)

## STEPS FOR OPERATION:

Please follow these steps for success!

## Assuming you have forked/cloned this repository, open up the folder and do the following:

1) First we'll want to establish our database that the managers and inventory will be in.  In your terminal, run ```docker pull postgres```.
2) After docker has updated, you will need to create the directories that will house your database data by running this command ```mkdir -p $HOME/docker/volumes/postgres```.
3) Run the following command to start up a Docker Postgres container instance of the image that was pulled: ```docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres```
4) This should populate a PSQL Container ID. Then run the following command ```docker exec -it <first 3 characters of the PSQL-Container-ID> bash```
5) Run ```psql -U postgres```
6) When you type in ```\l``` it will populate a list of databases. You will need to add a database to that list of databases for this application. 
7) Run the following two commands: ```CREATE DATABASE inventory;``` and ```CREATE DATABASE managers;```

## With Docker up and running and our databases open, I like to keep that in a terminal window for future use and open a new one.  Next, continue our installation steps to get up and running:

1) Change directory into "server" and run ```npm install```
2) While still in the server directory, run ```npx knex migrate:latest``` followed by ```npx knex seed:run```.  This will get the initial tables into the database.  Note:  the inventory will be empty!  You haven't added anything yet!
3) Spin up the server by typing the command ```npm start```

## Let's get our front end talking to the server and the database so we can manage that inventory!

1) Open a new terminal window and change directory into "front-end" and run ```npm-install```
2) After installation is complete, run the command ```npm start```.
3) In the window that has opened, you'll be greeted with a login page!

If this is your first time installing and running our application, you'll need to create your account to get started.  What are you waiting for!??!
