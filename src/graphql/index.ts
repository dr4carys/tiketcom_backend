import { schemaComposer } from 'graphql-compose';
import { hotelConnection } from './hotel';

schemaComposer.Query.addFields({
  hotelConnection,
});

schemaComposer.Mutation.addFields({});

export const graphqlSchema = schemaComposer.buildSchema();
