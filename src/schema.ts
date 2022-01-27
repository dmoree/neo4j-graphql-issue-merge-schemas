import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefsAIO } from '../typedefs/aio';

export function getTypeDefs(which: string) {
  if (which === 'aio') return typeDefsAIO;

  // Bring in all our baseline typedefs in SDL format
  // we don't want to catch these, if it fails, it's a critical error
  const typeDefs = loadFilesSync(
    ['typedefs/movie.graphql', 'typedefs/review.graphql', 'typedefs/user.graphql'],
    { extensions: ['graphql'] }
  );

  const typeDefsExtra = loadFilesSync('typedefs/user-extended.graphql', {
    extensions: ['graphql'],
  });

  return mergeTypeDefs([typeDefs, typeDefsExtra]);
}
