import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function ViewFrom() {
    const [currentData,seCurrentData] = useState(null)
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const updateFormData = (originalData, submissionData) => {
        return originalData.map(item => {
            if (submissionData.hasOwnProperty(item.name)) {
                return {
                    ...item,
                    value: submissionData[item.name]
                };
            }
            return item;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let TempData = currentData.fields;
        const updatedData = updateFormData(TempData, formData);
        console.log("updatedData",updatedData)
        navigate("/")
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/form/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                seCurrentData(result)
            } catch (error) {
                // setError(error);
            }
        };
            fetchData()

    }, [id]);

    return (<>

        <div class="homepage_content">
            <div class="text_center">
                <h3>{currentData?.formName}</h3>
            </div>

            <hr></hr>
            <form onSubmit={handleSubmit} >
                <div style={{ display: "flex", flexWrap: "wrap" }}>

                    {currentData && currentData?.fields.map((data, index) => {
                        return (<>
                            <div key={index} class="justify-content-center d-flex" style={{ height: "50%", padding: "2%", width: "45%" }}>
                                <span>{data.name} : </span>
                                <input class="input-field-border" type={`${data.type}`} id={`${data.name}`} name={`${data.name}`} defaultValue={`${data.value}`} placeholder={`${data.placeHolder}`} onChange={handleChange} />
                            </div>
                        </>)
                    }
                    )}

                </div>
                <div class="d-flex justify-content-center">
                <button class="submit-button " type="submit" style={{ textAlign: "center" }} >SUBMIT</button>
                </div>
            </form>


        </div>
    </>
    )
}

export default ViewFrom

