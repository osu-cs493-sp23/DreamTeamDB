docker-start:
	sudo systemctl start docker

mongo-run:
	docker run -d -p 27017:27017 --name mongo-server -e "MONGO_INITDB_ROOT_USERNAME=root" -e "MONGO_INITDB_ROOT_PASSWORD=pass" mongo:latest

mongo-attach:
	docker exec -it mongo-server /bin/bash