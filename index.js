"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const app = (0, express_1.default)();
const client = (0, redis_1.createClient)({
    url: 'redis-server:6379',
});
client.set('visits', 0);
app.get('/', (req, res, next) => {
    client.get('visits').then(visits => {
        res.send('Number of visits is' + visits);
        if (visits) {
            client.set('visits', parseInt(visits + 1));
        }
    });
});
app.listen(8081, () => {
    console.log('====================================');
    console.log('Listening on port 8081');
    console.log('====================================');
});
