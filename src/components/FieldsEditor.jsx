import React from 'react'

function FieldsEditor({ handlCurrentData, fieldValue,fieldPlaceHolderValue,currentField,formEditedContent,formName}) {
  return (
    
    <div style={{border:"2px solid black",height:"auto",width:"40%",padding:"2%"}}>
    <div style={{padding:"2%",textAlign:"center"}}><span style={{width:"100%"}}>FORM EDITOR</span></div>
    
    {formEditedContent === "title" ? (<>
      <div>Title:</div>
    <input onChange={(e)=>{handlCurrentData(e,"formName")}} class="input-field-border" type="text" placeholder='name' value={formName} /><br/>

    </>)
    :
   ( (currentField && formEditedContent==="fields") ?  (<> 
    <div style={{padding:"2%",textAlign:"center",height:"5px"}}><b style={{width:"100%"}}>{currentField? (currentField.type).toUpperCase() :""}</b></div>
    <div>Title:</div>
    <input onChange={(e)=>{handlCurrentData(e,"value")}} class="input-field-border" type="text" placeholder='name' value={fieldValue} /><br/>
    <input  onChange={(e)=>{handlCurrentData(e,"placeHolder")}} class="input-field-border" type="text"  placeholder='Place Holder' value={fieldPlaceHolderValue}/>
    </>) : "Select Field to see Editor") }

   
   </div>
  )
}

export default FieldsEditor