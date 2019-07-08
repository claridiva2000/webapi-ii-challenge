import React from 'react'

const Card = (props) => {
  return (
    <div>
       <>
          {props.quotes.map(quote => (
            <div key={quote.id} style={cardStyle}> 
            <h3> {quote.title}</h3>
            <p>{quote.contents}</p>
            <span style={deleteStyle}>❌</span> <span >📝</span>  
            </div>
          ))}
        </>
    </div>
  )
}

const deleteStyle={
  marginRight: '50px'
}
const cardStyle={
  border: '1px darkgreen solid',
  paddingBottom: '10px'
}
export default Card
