publish:
	npm publish --dry-run
lint:
	npx eslint .
link:
	npm link
test-coverage:
	npm test -- --coverage --coverageProvider=v8
