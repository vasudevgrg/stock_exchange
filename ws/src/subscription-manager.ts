import { createClient, RedisClientType } from "redis";
import { UserManager } from "./user-manager";

export class SubscriptionManager {
    private static instance: SubscriptionManager;
    private subscriptions: Map<string, string[]> = new Map(); 
    private client : RedisClientType
    
    constructor() {
         this.client = createClient();
        this.client.connect();
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = new SubscriptionManager();
        }
        return this.instance;
    }

    public subscribe(market:string, id: string) {
        if(this.subscriptions.get(market)?.includes(id)) {
            return;
        }
        if(! this.subscriptions.get(market)) {
            this.subscriptions.set(market, []);
        }

        this.subscriptions.get(market)?.push(id);
        this.client.subscribe(market, (message)=> {
            console.log('market: ', market);
            this.subscriptions.get(market)?.forEach(id => {
                UserManager.getInstance().getUser(id)?.emit(message)
            })
        })
    }

    public unsubscribe(market: string, id: string) {
        if( ! this.subscriptions.get(market)?.includes(id)) {
             return;
        }

        if( this.subscriptions.get(market)?.length==1) {
             this.subscriptions.delete( market);
        } else{
            this.subscriptions.set(market, this.subscriptions.get(market)?.filter(subscription => subscription!= id) as string[])
        }
    }

}