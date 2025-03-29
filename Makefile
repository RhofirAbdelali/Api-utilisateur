start:
	npm run dev

build:
	npm run build

generate:
	npx prisma generate

seed: generate
	npx prisma db seed

reset:
	npx prisma generate
	npx prisma db push --force-reset
	npx prisma db seed

migrate:
	npx prisma migrate deploy

test: reset
	npm test
