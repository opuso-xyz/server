# Opuso Todo Backend

## Developing

Clone this repository, `cd` into it, then
```bash
docker-compose up # Run the mongodb and app container from the local files in development mode
```

Navigate to `localhost:4000` to see the GraphQL explorer. This will enable hot reloading and automatic file syncing when editing the code.
You can access mongodb at port 1000 on your local machine.

## Notes

### Authorization
You can add the header `Authorization: <token>` to authorize requests.
