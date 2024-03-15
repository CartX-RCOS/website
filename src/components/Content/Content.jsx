import React from 'react';
import Card from '../Card/Card';
import './Content.css'

const Content = ({ sidebar }) => {
  return (
   <>
    <div className="content-wrapper">
    <div className="content" style={!sidebar ? { width: "100vw", left: "0%" } : null }>
        
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        
        </div>   
    </div>
   </>
  )
}

export default Content

