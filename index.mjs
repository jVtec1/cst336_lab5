import express from 'express';
import fetch from 'node-fetch';
//needed to use node with vercel
import path from "path";
import { fileURLToPath } from "url";

const planets = (await import('npm-solarsystem')).default;
//needed to use node with vercel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=solar%20system&per_page=50&orientation=horizontal";
let response = await fetch(url);
let data = await response.json();
let size = Object.keys(data.hits).length;

const app = express();
app.set("view engine", "ejs");
//needed to use node with vercel
app.set("views", path.join(__dirname, "views")); // Ensure this points to the correct directory
app.use(express.static("public"));

app.get('/', (req, res) => {  
    let rand = Math.floor(Math.random() * size);
    res.render('home',
        {
            img:data.hits[rand].largeImageURL
        }
    );
});
app.get('/mercury', (req, res) => {
    let mercuryInfo = planets.getMercury();
    res.render('mercury',
        {
            mercury:mercuryInfo
        });
});
app.get('/venus', (req, res) => {
    let venusInfo = planets.getVenus();
    res.render('venus',
        {
            venus:venusInfo
        });
});
app.get('/mars', (req, res) => {
    let marsInfo = planets.getMars();
    res.render('mars',
        {
            mars:marsInfo
        });
});
app.get('/saturn', (req, res) => {
    let saturnInfo = planets.getSaturn();
    res.render('saturn',
        {
            saturn:saturnInfo
        });
});
app.get('/nasa', async (req, res) => {
    let url2 = "https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=2025-03-06";
    let response2 = await fetch(url2);
    let data2 = await response2.json();
    res.render('nasa',
        {
            nasa:data2
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});

//needed to use node with vercel
export default app;
