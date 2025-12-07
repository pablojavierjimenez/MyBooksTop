import { createSchema, createYoga } from 'graphql-yoga';
import fetch from 'node-fetch';

const API_REST_URL = 'http://localhost:3000';

export const yogaApp = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Book {
        id: ID!
        title: String!
        author: String!
      }

      type Query {
        books: [Book!]!
        book(id: ID!): Book
      }
    `,
    resolvers: {
      Query: {
        books: async () => {
          const res = await fetch(`${API_REST_URL}/books`);
          return res.json();
        },
        book: async (_: any, args: { id: string }) => {
          const res = await fetch(`${API_REST_URL}/books/${args.id}`);
          if (!res.ok) return null;
          return res.json();
        },
      },
    },
  }),
  graphqlEndpoint: '/graphql',
  landingPage: true,
});
