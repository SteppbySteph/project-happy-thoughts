import React from 'react'
import { useState, useEffect } from 'react'

import Form from 'components/Form'
import Thought from 'components/Thought'


export const Overview = () => {
  const [thoughts, setThoughts] = useState([])
  const [newThought, setNewThought] = useState('')

  const handleOnNewThought = (event) => {
    setNewThought(event.target.value)
  }

  useEffect(() => {
    fetchThoughts();
  }, [])

  const fetchThoughts = () => {
    fetch('https://happy-thoughts-welcome.onrender.com/thoughts')
      .then(res => res.json())
      .then(data => setThoughts(data.response))
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: newThought })
    }

    fetch('https://happy-thoughts-welcome.onrender.com/thoughts', options)
      .then((res) => res.json())
      .then(() => fetchThoughts())
      .finally(() => setNewThought(''))
  }


  const handleLikes = (id) => {

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }

    fetch(`https://happy-thoughts-welcome.onrender.com/thoughts/${id}/like`, options)
      .then((res) => res.json())
      .then(() => fetchThoughts())
  }

  const handleDelete = (id) => {

    const options = {
      method: 'DELETE'
    }

    fetch(`https://happy-thoughts-welcome.onrender.com/thoughts/${id}`, options)
      .then((res) => res.json())
      .then(() => fetchThoughts())
  }



  return (
    <section className='container'>
      <Form
        onFormSubmit={handleFormSubmit}
        newThought={newThought}
        onSetThoughtChange={handleOnNewThought} />

      {thoughts.map((thought) => (
        <Thought
          key={thought._id}
          thought={thought}
          handleLikes={handleLikes}
          handleDelete={handleDelete}
          fetchThoughts={fetchThoughts}
        />
      ))}
    </section>
  )
}
