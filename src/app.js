const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  //retornar todos os repositorios criados
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  
  //capturar dados para objeto
  const {title, url, techs} = request.body;

  //criar objeto conforme as especificações do desafio
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  //adicionar novo objeto ao array
  repositories.push(repository);

  //retornar json do objeto
  return response.json(repository);


});

app.put("/repositories/:id", (request, response) => {
  
  //metodo para alterar repositorios
  const { id } = request.params;
  const {title, url, techs, likes} = request.body;

  const repIndex = repositories.findIndex(repository => repository.id === id);

  if(repIndex < 0){

    return response.status(400).json({error: 'Repository not found!' });

  }else{
    
    const repository = {
      id: repositories[repIndex].id,
      title,
      url,
      techs,
      likes: repositories[repIndex].likes
    };

    
    repositories[repIndex] = repository;

    return response.json(repository);
  }


});

app.delete("/repositories/:id", (request, response) => {
  
  const { id } = request.params;

  const repIndex = repositories.findIndex(repository => repository.id === id);

  if(repIndex < 0){

    return response.status(400).json({erro: 'repository not found!'});

  }else{

    repositories.splice(repIndex,1);

    return response.status(204).send();
  }

});

app.post("/repositories/:id/like", (request, response) => {
  
  const {id} = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if(!repository){

    return response.status(400).json({error: 'Repository do not exists!'});

  }else{

    repository.likes += 1;

    return response.json(repository);

  }

  
});

module.exports = app;
