import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core";

import { __prod__ } from "./constants"; 
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from './resolvers/user';

const main = async () => {
    const orm = await MikroORM.init(mikroConfig); 
    await orm.getMigrator().up();
    const emFork = orm.em.fork();

    const app = express()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false,
        }),
        context: () => ({ em: emFork })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app }); 

    app.listen(4000, () => {
        console.log("server starting at http://localhost:4000");
    });





}

main()