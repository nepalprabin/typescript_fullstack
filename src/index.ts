import { MikroORM } from "@mikro-orm/core";

import { __prod__ } from "./constants"; 
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";

const main = async () => {
    const orm = await MikroORM.init(mikroConfig); 
    const emFork = orm.em.fork();
    // await  orm.getMigrator().up();
    // const post = emFork.create(Post, { title: "Hello" });
    // await emFork.persistAndFlush(post);
    const posts = await emFork.find(Post, {});
    console.log(posts)


}

main()