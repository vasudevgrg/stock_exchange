export class UserManager {
    private instance: UserManager;
    private users: [];


    getInstance() {
        (!this.instance) {
            this.instance = new UserManager()
        }

        return this.instance;
    }

    addUser(ws: WebSocket) {
        const id = this.getRandomId();
        
    }

    private getRandomId() {
        return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);
    }
}