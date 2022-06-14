import { schemaComposer } from 'graphql-compose';
import { hotelCreateMany, hotelConnection } from './hotel';

schemaComposer.Query.addFields({
  hotelConnection,
});

schemaComposer.Mutation.addFields({
  hotelCreateMany,
});

export const graphqlSchema = schemaComposer.buildSchema();
