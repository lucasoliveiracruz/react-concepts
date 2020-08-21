import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    fetchRepositories();
  }, []);

  function fetchRepositories() {
    api.get("/repositories").then(({ data }) => {
      setRepositories(data);
    });
  }

  async function handleAddRepository() {
    const data = {
      title: "Meu novo projeto",
      url: "https://github.com/locrz",
      techs: ["React", "Node"],
    };

    api.post("/repositories", data).then(({ data }) => {
      setRepositories([...repositories, data]);
    });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 &&
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
