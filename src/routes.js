const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Dev')

const routes = Router();

routes.post('/devs', async (req, res) => {
  const { github_username, techs } = req.body;

  const response = await axios.get(`https://api.github.com/users/${github_username}`)
  
  const { name = login, avatar_url, bio, latitude, longitude } = response.data;
  
  const techsArray = techs.split(',').map(tech => tech.trim());

  const location = {
    type: 'Point',
    coordinates: [longitude, latitude]
  }

  const dev = await Dev.create({
    github_username,
    name,
    avatar_url,
    bio,
    techs: techsArray,
    location
  })

  return res.json({ dev });
});

routes.get('/', (req, res) => {
  console.log(req.body)
  return res.json({ message: "test"});
});


module.exports = routes;