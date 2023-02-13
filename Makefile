include .env

down:
	docker-compose down

restart:
	docker-compose up -d

build:
	docker-compose up --build -d

clear:
	docker system prune --volumes

stop: down clear
