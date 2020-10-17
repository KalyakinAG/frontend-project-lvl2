install:
	sudo npm install
uninstall:
	sudo npm uninstall
gendiff:
	node bin/gendiff.js
publish:
	sudo npm publish --dry-run
lint:
	npx eslint .
link:
	sudo npm link
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8