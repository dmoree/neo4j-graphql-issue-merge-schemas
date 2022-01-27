import { ApolloServer } from 'apollo-server';
import { Neo4jGraphQL } from '@neo4j/graphql';

import { driver } from './driver';
import { getTypeDefs } from './schema';
import { from, logger } from 'env-var';
const env = from(process.env, {}, logger);

const whichTypeDefs = env.get('TYPEDEFS').default('multi').asString();
const typeDefs = getTypeDefs(whichTypeDefs);

const neo4jGraphQL = new Neo4jGraphQL({ typeDefs, driver });

const server = new ApolloServer({ schema: neo4jGraphQL.schema });

server.listen().then(({ url }) => {
  console.log(`@neo4j/graphql API ready at ${url}`);
});
