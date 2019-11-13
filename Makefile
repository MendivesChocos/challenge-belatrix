.DEFAULT_GOAL	:= help
.PHONY: deploy

## GENERAL ##
OWNER			= belatrix
SERVICE_NAME	= change-coin
VERSION			= v1

## DEV ##
TAG_DEV				= dev
TAG_MYSQL 			= mysql
USER_ID  			?= $(shell id -u)
GROUP_ID 			?= $(shell id -g)
DOCKER_USER			?= node:node

## DEPLOY ##
ENV 				?= dev
DEPLOY_REGION 		?= eu-west-1
DESIRED_COUNT 		?= 1
MIN_SCALING			?= 1
MAX_SCALING			?= 2
MEMORY_SIZE 		?= 256
CONTAINER_PORT 		?= 80
HTTPS_PRIORITY 		?= 59

## RESULT_VARS ##
PROJECT_NAME			= $(OWNER)-$(ENV)-$(SERVICE_NAME)
CONTAINER_NAME 			= $(PROJECT_NAME)_backend
IMAGE_DEV				= $(PROJECT_NAME):$(TAG_DEV)
IMAGE_DEPLOY			= $(PROJECT_NAME):$(TAG_DEPLOY)
CLUSTER 				= $(OWNER)-dev
PREFIX_PATH     		= /$(VERSION)/$(SERVICE_NAME)


build: ## build image to dev and cli: make build
	docker build -f docker/dev/Dockerfile --build-arg UID=$(USER_ID) --build-arg GID=$(GROUP_ID) -t $(IMAGE_DEV) docker/dev/

yarn-install-local: ## yarn install on local: make yarn-install-local
	docker run --rm -u node -t -v $(PWD)/app:/home/node/app/ --entrypoint="yarn" $(IMAGE_DEV) install

test:
	docker run --rm -u node -t -v $(PWD)/app:/home/node/app/ --entrypoint="yarn" $(IMAGE_DEV) test

## CloudFormation
sync-cloudformation: ## Sync additional cloudformation resources in S3 before to push image to registry in aws: make sync-cloudformation
	aws s3 sync ./cloudformation/stacks s3://$(STACK_PATH)

update-service: ## Deploy service with cloudformation: make update-service
	@make sync-cloudformation
	aws cloudformation deploy \
	--template-file ./cloudformation/master.yml \
	--stack-name $(PROJECT_NAME)-service \
	--parameter-overrides \
		S3Path=$(STACK_PATH) \
		HttpsListenerPriority=$(HTTPS_PRIORITY) \
		DesiredCount=$(DESIRED_COUNT) \
		MaxScaling=$(MAX_SCALING) \
		MinScaling=$(MIN_SCALING) \
		Image=$(DEPLOY_REGISTRY)/$(IMAGE_DEPLOY) \
		ServiceName=$(SERVICE_NAME) \
        PrefixPath=$(PREFIX_PATH) \
		Env=$(ENV) \
		Owner=$(OWNER) \
		ContainerPort=$(CONTAINER_PORT) \
		MemorySize=$(MEMORY_SIZE) \
	--region $(DEPLOY_REGION) \
	--capabilities CAPABILITY_NAMED_IAM

create-registry: ## Create registry in aws ECR service: make create-registry
	aws cloudformation deploy \
	--template-file ./cloudformation/registry.yml \
	--stack-name $(PROJECT_NAME)-registry \
	--parameter-overrides \
		ProjectName=$(PROJECT_NAME) \
	--region $(DEPLOY_REGION) \
	--capabilities CAPABILITY_IAM

up: ## up docker containers: make up
	@IMAGE_DEV=$(IMAGE_DEV) \
    PREFIX_PATH=$(PREFIX_PATH) \
	CONTAINER_NAME=$(CONTAINER_NAME) \
	docker-compose -p $(SERVICE_NAME) up -d
	make attach

down: ## Stops and removes the docker containers: make down
	@IMAGE_DEV=$(IMAGE_DEV) \
	IMAGE_CLI=$(IMAGE_CLI) \
	CONTAINER_NAME=$(CONTAINER_NAME) \
	docker-compose -p $(SERVICE_NAME) down

attach: ## attach log to console: make attach
	docker attach --sig-proxy=false $(CONTAINER_NAME)

help:
	@printf "\033[31m%-16s %-59s %s\033[0m\n" "Target" "Help" "Usage"; \
	printf "\033[31m%-16s %-59s %s\033[0m\n" "------" "----" "-----"; \
	grep -hE '^\S+:.*## .*$$' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-16s\033[0m %-58s \033[34m%s\033[0m\n", $$1, $$2, $$3}'
