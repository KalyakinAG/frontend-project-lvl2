install:
	sudo npm install
uninstall:
	sudo npm uninstall
gendiff:
	node bin/gendiff.js ./__tests__/__fixtures__/1/file1.json ./__tests__/__fixtures__/1/file2.json --format plain
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
