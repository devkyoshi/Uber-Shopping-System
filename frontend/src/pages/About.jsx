import React from 'react'
import { SolidColorPic } from '../components/SolidColorPic'


export default function About() {
  return (
    <div className='inner-layout'>
      <SolidColorPic/>
      <h3 className='ourM'>Our Mission</h3>
      <p className='share'>To share love through grocery deliveries</p>
      <h3 className='ourM'>Quality Products,Delivered with Care</h3>
      <p className='share'>We understand that life can be busy,and finding time to shop for groceries can be a challege.
      That's where we come in.Our team works tirelessly to handpick the freshest and highest-quality products for you.From farm-fresh produce to pantry 
      staples and gourment treats,we've got everything you need to create delicious meals and memorable moments at home.</p>
      <h3 className='ourM'>Exeptional Service,Every Step of the Way</h3>
      <p className='share'>When you shop with Uber.Shopping you can expect more than just groceries.
      You can expect exceptional service from start to finish.
      Our dedicated team is here to assist you with any questions or special request you may have.
      We're here to make you shopping experience a breeze by helping you to pick groceries effectively and wisely.</p>
    </div>
  )
}
