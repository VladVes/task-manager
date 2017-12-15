install:
	npm install

server:
	npm run babel-node -- 'src/bin/taskManager.js'

test:
	npm test

build:
	npm run build

lint:
	npm run eslint ./src/**
