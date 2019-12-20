import Server from "./Server";
import {initDatabase} from "./services/data/DatabaseConnection";

class App {
    constructor() {
        const start = new Date();
        initDatabase().then(r => Server(5000)).then(() => {
            const stop = new Date();
            console.log('Server start finished in', (stop.getMilliseconds() - start.getMilliseconds()), 'ms');
        });
    }
}

export default App;
