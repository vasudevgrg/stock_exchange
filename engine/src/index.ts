import { createClient } from "redis";
import { Engine } from "./trade/engine";

async function main() {
    const engine = new Engine();
    const redisCLient = createClient();
    await redisCLient.connect();

    console.log('connected to redis');

    while(true) {

        const res = await redisCLient.lPop('messages');
        if(!res) {

        }else{

            engine.process(JSON.parse(res));
        }
    }
}
main();