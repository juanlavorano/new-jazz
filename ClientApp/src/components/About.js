import React from 'react'

export function About() {
    return (
        <div className='about padding-global'>
            <h2>What's New Jazz?</h2>
            <div className='about__cards'>
                <div className='about__card'>
                    <h3 className='about__card__title'>Discover</h3>
                    <p className='about__card__text'>This is the place to start. Discover the world of jazz, listen to what the community has to recommend. From the most well-known albums and artist, to the hidden gems the genre has to offer.</p>
                </div>
                <div className='about__card'>
                    <h3 className='about__card__title'>Share</h3>
                    <p className='about__card__text'>Save the music you like and share it with your friends and family.</p>
                </div>
                <div className='about__card'>
                    <h3 className='about__card__title'>Recommend</h3>
                    <p className='about__card__text'>Add new music so that more people gets to know it! Rate the music you listen to. Let's build a better service all together.</p>
                </div>
            </div>
        </div>
    )
}
