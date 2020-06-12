# Opuso Todo Backend

## Developing

Clone this repository, `cd` into it, then
```bash
docker-compose -f docker-compose-development.yml up # Run the mongodb and app container from the local files
```


Navigate to `localhost:8000` to see the GraphQL explorer. This will enable hot reloading and automatic file syncing when editing the code.

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
