import MongoConnection from "./mongo/MongoConnection.mjs";
import { commentWithMovieTitle, titlesWithRatingHigherThenAvarege } from "./mongo/aggregateObjects.mjs";

const DB_NAME = 'sample_mflix';
const COLLECTION_MOVIES_NAME = "movies";
const COLLECTION_COMMENTS_NAME = "comments";

const mongoConnection = new MongoConnection(process.env.MONGO_URI, DB_NAME);
const collectionMovies = mongoConnection.getCollection(COLLECTION_MOVIES_NAME);
collectionMovies.aggregate(titlesWithRatingHigherThenAvarege).toArray().then( d => d.forEach( o => console.log(o.title)));
const collectionComments = mongoConnection.getCollection(COLLECTION_COMMENTS_NAME);
collectionComments.aggregate(commentWithMovieTitle).toArray().then(d => d.forEach(o => console.log(o)));