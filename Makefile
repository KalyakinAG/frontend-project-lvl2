install:
	npm install
uninstall:
	npm uninstall
publish:
	npm publish --dry-run
lint:
	npx eslint .
link:
	npm link
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
