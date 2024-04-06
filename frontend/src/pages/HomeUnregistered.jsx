import React from 'react'
import { PromotionContainer } from '../components/PromotionContainer'
import { CardContainer } from '../components/CardContainer'
import { Footer } from '../components/Footer'

export default function HomeUnregistered() {
  return (
    <div className='bg'>
        <PromotionContainer/>
        <section class="routes" id="reservations">
        
            <h1 class="heading">
                Shop Items
            </h1>

            <div class="box-container">
                <CardContainer/>
                <CardContainer/>
                <CardContainer/>
                <CardContainer/>
                <CardContainer/>
                <CardContainer/>
                <CardContainer/>
                <CardContainer/>
            </div>
        </section>
        
            <Footer/>
        
    </div>

    
  )
}
