import { algoliasearch } from "algoliasearch/dist/browser";

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID as string;
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY as string;

export const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
export const eventsIndex = algoliaClient.initIndex("events");
export const usersIndex = algoliaClient.initIndex("users");


