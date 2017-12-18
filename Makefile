install:
	npm install

db-setup:
	npm run sequelize db:migrate

start:
	DEBUG="TaskManager:*" npm run nodemon -- --watch . --ext '.js' --exec  babel-node -- 'src/bin/taskManager.js'

test:
	npm test

build:
	npm run build

lint:
	npm run eslint ./src/**
