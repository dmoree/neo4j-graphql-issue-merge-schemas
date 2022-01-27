import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { DocumentNode, GraphQLSchema } from 'graphql';
import { typeDefsAIO } from '../typedefs/aio';

export function getTypeDefs(which: string): DocumentNode {
  if (which === 'aio') return typeDefsAIO;

  // Bring in all our baseline typedefs in SDL format
  // we don't want to catch these, if it fails, it's a critical error
  const typeDefs: GraphQLSchema = loadSchemaSync(
    ['typedefs/movie.graphql', 'typedefs/review.graphql', 'typedefs/user.graphql'],
    { loaders: [new GraphQLFileLoader()]},
  );
  let tdList: GraphQLSchema[] = [typeDefs]

  const typeDefsExtra: GraphQLSchema = loadSchemaSync(
    'typedefs/user-extended.graphql',
    { loaders: [new GraphQLFileLoader()]},
  )
  tdList = [typeDefs, typeDefsExtra];

  return mergeTypeDefs(tdList);
}