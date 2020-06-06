import { GraphQLServer } from 'graphql-yoga';
import * as mongoose from 'mongoose';
import resolvers from './resolvers';

const mongoDatabase = process.env.MONGO_DB || 'development';
const mongoPort = process.env.MONGO_PORT || 27017;
const port = process.env.PORT || 8000;

mongoose
  .connect(`mongodb://mongodb:${mongoPort}/${mongoDatabase}`, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(
      'MongoDB connected at '
        + `mmongodb://mongodb:${mongoPort}/${mongoDatabase}`,
    );
  })
  .catch((err: Error) => {
    if (err.message.indexOf('ECONNREFUSED') !== -1) {
      console.error(
        "Error: The server was not able to reach MongoDB. Maybe it's not running?",
      );
      process.exit(1);
    } else {
      throw err;
    }
  });

const opts = {
  port,
};
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (request) => ({
    ...request,
    mongoose,
  }),
});
server.start(opts, () => console.log(`Server is running on http://localhost:${port}`));
