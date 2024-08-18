import React from 'react'
import edit from "../svg/editIcon.svg";
import deleteIcon from "../svg/deleteIcon.svg";
function FiledComponent({data,dataIndex,handleFiledsData,handleDeleteFiledsData}) {

  return (
    <div class="d-flex" style={{border:"1px solid grey",height:"30px",width:"48%",gap:4,borderRadius:"3px",justifyContent:"space-evenly"}}>
    <div><input disabled class="input-field-border"  value={data.name ? data.name :""}  placeholder='Title' /></div>
    <div onClick={()=>handleFiledsData(dataIndex,data)}><img height={10} src={edit} alt="" class='curser-button' /></div>
    <div  onClick={()=>handleDeleteFiledsData(dataIndex,data)} ><img height={10} src={deleteIcon} alt="" class='curser-button' /></div>
    
 </div>
  )}

export default FiledComponent