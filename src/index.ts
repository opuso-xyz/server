import { GraphQLServer } from 'graphql-yoga'
import resolvers from './resolvers'
import './mongodb-client'
import * as mongoose from "mongoose";

mongoose.connect('mongodb://mongodb:27017/development', {useNewUrlParser: true})
  .then(() => {
    console.log(
      "MongoDB connected at " + `mmongodb://mongodb:27017/development`
    );
  })
  .catch((err: Error) => {
    if (err.message.indexOf("ECONNREFUSED") !== -1) {
      console.error(
        "Error: The server was not able to reach MongoDB. Maybe it's not running?"
      );
      process.exit(1);
    } else {
      throw err;
    }
  });
const db = mongoose.connection;

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    mongoose
  }),
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
