Welcome to your very own inventory manager!

First thing's first, create your account!  Once you have created your account with us,
you'll be able to see the items that are in your inventory.

Shy? Don't want to create an account yet?  That's okay!  Take a look at all inventory
in the system as a visitor.

However, if you register an account with us, you can add any item you want to the inventory!

FIRST STEPS:

After forking and cloning this repository, using several terminals, change directory into front-end and run "npm start".  Change directory from another terminal into server and again run "npm start".  Finally, spin up docker with "docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres".

At this point, the server will be talking to the database, and the webpage running from the front end will be able to display the information correctly.

Give it a spin!
