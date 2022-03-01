import { coinFlip, coinFlips, countFlips, flipACoin } from './coin.mjs';
import express from 'express';
import minimist from 'minimist';
const app = express()
const args = minimist(process.argv.slice(2));
const port = args.port || process.env.PORT || 5000

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });

app.get('/app/flip/', (req, res) => {
    res.statusCode = 200
    const json = { "flip" : coinFlip() }
    res.status(res.statusCode)
    res.setHeader('Content-Type', 'application/json')
    res.json(json)
    
});

app.get('/app/flips/:number', (req, res) => {
    res.statusCode = 200
    const raw = coinFlips(req.params.number || 1)
    const summary = countFlips(raw)
    const json = {
        "raw": raw,
        "summary": summary
    }
    res.setHeader('Content-Type', 'application/json')
    res.json(json)
})

app.get('/app/flip/:call', (req, res) => {
    res.statusCode = 200
    const json = flipACoin(req.params.call)
    res.setHeader('Content-Type', 'application/json')
    res.json(json)
})
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});



const server = app.listen(port, () => {
        console.log('App listening on port %PORT%'.replace('%PORT%',port))
});