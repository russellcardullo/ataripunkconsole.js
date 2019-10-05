APC_IMAGE=ataripunkconsole.js:dev
RUBY_IMAGE=ruby:2.5

Gemfile.lock: Gemfile
	docker run --rm -v "$(PWD)":/usr/src/app -w /usr/src/app $(RUBY_IMAGE) bundle install

docker-image: Gemfile.lock
	docker build -t $(APC_IMAGE) .

.PHONY: local-server
local-server:
	docker run --rm -p 9292:9292 $(APC_IMAGE)
