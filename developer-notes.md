# Setup / Notes / Todos / Misc

## Setup:
After the droplet was provisioned, each user got an SSH key to access the server.
Each user got a username, password and consequently a home folder.
Both users know the root password
Both user accounts belong to the sudo group

We updated apt-get
`$ sudo apt-get update`
We installed a few tools, such as htop and git.
Both users have a local vim preference folder.

We created a snapshot of our image

## Up and running:
First step was to install docker, following DigitalOcean's tutorials.
After Docker is set, we run

`$ sudo usermod -aG docker $your_user`

to add both users to the Docker group. By doing so, there is no need to be root user in order to use docker.
We setup docker to run an nginx server that is currently serving a simple webpage, but will become our reverse proxy.

## File Structure
The app is hosted in git, and both users have rwx access to the git parent directory

## Schemas
Two .json files were already created with tentative schemas for the database

# Commands
## Run NGINX from Docker
(as a mounted volume and detached process)
`$ docker run --name docker-nginx -p 80:80 -d -v ~/app/docker-nginx/html:/usr/share/nginx/html nginx`

# Pull config file (.conf) from Docker image:
`sudo docker cp docker-nginx:/etc/nginx/conf.d/default.conf default.conf

# Production notes:
vim /etc/mongod.conf
bindIp: 0.0.0.0 for testing
bindIp: 127.0.0.1 for defaults

# Nginx loadbalances correctly, stepped off from docker because of bugs:
deleted default symlink @ /etc/nginx/sites-enabled/default
created load-balancer.conf file
$ sudo service restart nginx
