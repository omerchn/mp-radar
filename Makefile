target: install dev

install:
	cd server && npm install &
	cd client && npm install 

dev:
	cd server && npm run dev &
	cd client && npm run dev
