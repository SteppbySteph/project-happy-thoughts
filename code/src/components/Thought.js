import React from 'react'
import { formatDistance } from 'date-fns'
import parseISO from 'date-fns/parseISO'

const Thought = ({ thought, handleLikes }) => {

    const timePosted = formatDistance(parseISO(thought.createdAt), new Date(), { addSuffix: true })
    return (
        <section className='post-container'>
            <div className='post-content'>
                <div className='msg-delete'>
                    <p key={thought._id}>{thought.message}</p>
                </div>
                <div className='info-group' >
                    <div>
                        <button className={thought.hearts > 0 ? 'btn-heart clicked' : 'btn-heart'}
                            onClick={() => handleLikes(thought._id)}>
                            <span role='img' aria-label='heart'>❤️
                            </span>
                        </button>
                        <span className='like-counter'>x {thought.hearts}</span>
                    </div>
                    <p className='time-stamp'>{timePosted}</p>
                </div>
            </div>
        </section>
    )
}

export default Thought