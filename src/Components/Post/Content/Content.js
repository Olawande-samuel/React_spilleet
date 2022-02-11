import React from 'react'

const Content = ({children, content}) => {
    return (
        <div>
            <div>{children}</div>
           <p style={{fontSize:"15px"}} dangerouslySetInnerHTML={{ __html: content }} /> 

        </div>
    )
}

export default Content
