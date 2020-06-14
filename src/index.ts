import { GraphQLServer } from 'graphql-yoga';
import * as mongoose from 'mongoose';
import resolvers from './resolvers';

const port: number = parseInt(process.env.PORT) || 8000;
const mongoUri: string = process.env.MONGO_URI || 'mongodb://mongodb:27017/development';

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(
      'MongoDB connected at '
        + mongoUri,
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
