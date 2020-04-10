import React, { useState, useEffect } from 'react'

import api from './services/api'

import './styles.css'

function App () {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository () {
    try {
      const { data } = await api.post('repositories', {
        title: `New Repository ${Date.now()}`,
        url: 'url Default'
      })

      setRepositories([...repositories, data])
    } catch (error) {
      const { data } = error.response
      alert(data.message)
    }
  }

  async function handleRemoveRepository (id) {
    try {
      await api.delete(`repositories/${id}`)

      const newRepositories = repositories.filter(
        repository => repository.id !== id
      )

      setRepositories(newRepositories)
    } catch (error) {
      const { data } = error.response
      alert(data.message)
    }
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
