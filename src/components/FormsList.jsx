import React from 'react'
import { useNavigate } from 'react-router-dom';

function FormsList({ data, handleDelete}) {
  const navigate = useNavigate();

    const handleViewer = (id) => {
        navigate(`/${id}`); 
    };


  return (<>
    <h2>Forms</h2>
    {
      (data && data.length === 0) ? <>  <p>You have no forms Created</p> </>
        : <>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "" }}>
            {data.map((items, index) => {
              return (<>
                <div style={{ border: "2px solid black", height: "100px", width: "29%", margin: "5px" }}>
                  <div style={{ height: "50%", padding: "2%" }}><span style={{ width: "100%", }}>{items.formName}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                    <span class="curser-button" onClick={() => handleViewer(`view/${items._id}`)} style={{ color: "green" }}>VIEW</span>
                    <span class="curser-button" onClick={() => handleViewer(`form/${items._id}`)} style={{ color: "blue" }}>EDIT</span>
                    <span class="curser-button" onClick={() => handleDelete(items._id)} style={{ color: "red" }}>DELETE</span>
                  </div>
                </div>
              </>)
            })}



          </div>
        </>

    }
  </>)
}

export default FormsList