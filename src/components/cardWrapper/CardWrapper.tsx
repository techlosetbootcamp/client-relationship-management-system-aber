import React from 'react'


//TRY TO ADD HEADING AND BORDER AFTER HEADING IN THIS. INCLUDE MAP AS WELL
export const CardWrapper = (props: any) => {
    
  return (
    <div className={`bg-white rounded-[10.5px] border-[0.75px] border-borderGray py-[${props.reverse ? "16px" : "24px"}] px-[${props.reverse ? "24px" : "16px"}]  flex gap-[12px] flex-${props.flex} ${props.width} ${props.height}`}>
        {props.children}
    </div>
  )
}
