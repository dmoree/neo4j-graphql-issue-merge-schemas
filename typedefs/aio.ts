import { gql }  from "apollo-server";
import { DocumentNode } from "graphql";

export const typeDefsAIO: DocumentNode = gql`
type Movie {
  title: String!
  reviews: [Review!]! @relationship(type: "HAS_REVIEW", direction: OUT)
  averageRating: Float!
    @cypher(
        statement: """
        MATCH (this)-[:HAS_REVIEW]->(r:Review)
        RETURN avg(r.rating)
        """
    )
}

type Review @exclude {
  id: ID! @id
    rating: Float!
    createdAt: DateTime!
    content: String!
    author: User! @relationship(type: "AUTHORED", direction: IN)
    movie: Movie! @relationship(type: "HAS_REVIEW", direction: IN)
}

type User {
  username: String!
  reviews: [Review!]! @relationship(type: "AUTHORED", direction: OUT)
}

extend type User {
  favourites: [Movie]! @relationship(type: "FAVOURITE", direction: OUT)
}
`;