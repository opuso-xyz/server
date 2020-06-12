# Opuso Todo Backend

## Developing

Clone this repository, `cd` into it, then
```bash
docker-compose -f docker-compose-development.yml up # Run the mongodb and app container from the local files
```


Navigate to `localhost:8080` to see the GraphQL explorer. This will enable hot reloading and automatic file syncing when editing the code.

# Build Server Container

```shell script
docker build -t opuso/server .
```

# Running for Production
Note, this will pull the latest version of the opuso server container from dockerhub, which may not be up to date with your version. 
```bash
docker-compose up
```

Navigate to `localhost:8080` to see the GraphQL explorer. 

# Deploying
Follow the guide [here](https://docs.microsoft.com/en-us/archive/blogs/appconsult/deploy-a-docker-multi-container-application-on-azure-web-apps) to deploy the code. Chose the Dockerhub option and the `docker-compose-production.yml` file as your compose options


# Notes

### Creating Azure Webapp
`az webapp update -g opuso  -p OpusoBackend -n opuso-backend --multicontainer-config-type compose --multicontainer-config-file docker-compose.yml`

### Configuring the Storage Container
Create an Azure Files resource in a Storage Account

Run this to link them together
`az webapp config storage-account add -g opuso --name opuso-backend --storage-type AzureFiles --share-name opuso-db --account-name opuso --access-key <key> --mount-path "/home/db" --custom-id db`
