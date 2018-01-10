install:
	npm install

db:
	./dbmigrate

migrate:
	npm run sequelize db:migrate

seeds:
	npm run sequelize db:seed:all

start:
	DEBUG="TaskManager:*" npm run nodemon -- --watch . --ext js,pug --exec  babel-node -- 'src/bin/taskManager.js'

test:
	npm test

build:
	npm run build

lint:
	npm run eslint ./src/**
