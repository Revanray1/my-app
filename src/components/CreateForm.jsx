import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import edit from "../svg/editIcon.svg";
import deleteIcon from "../svg/deleteIcon.svg";
import FiledComponent from "./Fieldcomponent"
import FieldsEditor from "./FieldsEditor"
import { useNavigate } from 'react-router-dom';




function CreateForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formMode, setFormMode] = useState(null)
    const [tempData, setTempData] = useState(null)
    const [currentField, setCurrentFileds] = useState(null)
    const [currentFieldIndex, setCurrentFieldIndex] = useState(null)
    const [fieldValue, setFieldValue] = useState("")
    const [formName, setFormName] = useState(null)
    const [fieldPlaceHolderValue, setFieldPlaceHolderValue] = useState("")
    const [isInputVisible, setInputVisible] = useState(false)
    const [formEditedContent, setFormEditedContent] = useState(null)
    const [error, setError] = useState(null)


    const handlCurrentData = (e, field) => {
        if (field === "placeHolder") {
            setFieldPlaceHolderValue(e.target.value)
            let DummyData = tempData.fields

            DummyData[currentFieldIndex].placeHolder = e.target.value
            setTempData((prev) => {
                return { ...prev, fields: DummyData }
            })
        } else if (field === "value") {
            setFieldValue(e.target.value)
            let DummyData = tempData.fields

            DummyData[currentFieldIndex].name = e.target.value
            setTempData((prev) => {
                return { ...prev, fields: DummyData }
            })

        } else if (field === "formName") {
            setFormName(e.target.value)
            setTempData((prev) => {
                return { ...prev, formName: e.target.value }
            })
        }
    }

    const handleDeleteFiledsData = (dataIndex, data) => {
        let items = tempData.fields

        if (dataIndex >= 0 && dataIndex < items.length) {
            items.splice(dataIndex, 1); // Remove 1 item at the given index
        }

        setTempData((prev) => {
            return { ...prev, fields: items }
        })
    }
    const handleFiledsData = (dataIndex, data) => {
        setCurrentFieldIndex(dataIndex);
        setCurrentFileds(data)
        setFieldValue(data.name)
        setFieldPlaceHolderValue(data.placeHolder)
        setFormEditedContent("fields")
    }
    const handleAddField = (type) => {
        let DummyData = tempData.fields
        DummyData.push({ type: type, name: "", value: "", placeHolder: "" })
        setTempData((prev) => {
            return { ...prev, fields: DummyData }
        })
    }

    const handleUpdateForm = async () => {
        try {

            const response = await fetch(`http://localhost:4000/api/form/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data) {
                navigate(`/`);
            }
        } catch (error) {
            setError(error);
        }
    }
    const handleCreateForm = async () => {
        try {

            const response = await fetch('http://localhost:4000/api/form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data) {
                navigate(`/`);
            }
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/form/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setFormName(result.formName)
                setTempData(result)
                setFormMode("edit")
            } catch (error) {
                // setError(error);
            }
        };

        if (id !== "new") {
            fetchData()

        } else {
            setFormMode("create")
            setFormName("Untitled Form")
            setTempData({ formName: "Untitled Form", fields: [] })
        }
    }, [id]);
    return (
        <>
            <div class="homepage_content">
                <h3>{formMode === "create" ? "Create New Form" : "Edit Form"}</h3>
                <hr></hr>

                <div style={{ display: "flex" }}>
                    <div style={{ border: "2px solid black", height: "auto", width: "60%", padding: "2%" }}>
                        <div style={{ padding: "2%", textAlign: "center" }}>
                            <input disabled class="input-field-border" type="text" value={formName ? formName : ""} />
                            <img height={10} src={edit} alt="" class='curser-button' onClick={() => {
                                setFormEditedContent("title")
                            }
                            } /></div>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                            {
                                tempData && (tempData?.fields.map((data, index) => <FiledComponent dataIndex={index} data={data} handleFiledsData={handleFiledsData} handleDeleteFiledsData={handleDeleteFiledsData} />))}
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", margin: "4%" }}>
                            <button class="input-button " onClick={() => setInputVisible(!isInputVisible)}>{isInputVisible ? "CLOSE ADD INPUT" : "ADD INPUT"}</button>
                        </div>
                        {isInputVisible && <div style={{ gap: 2, display: "flex", justifyContent: "center", margin: "2%" }}>
                            <button class="inputfield-button curser-button" onClick={() => handleAddField("text")}>TEXT</button>
                            <button class="inputfield-button curser-button" onClick={() => handleAddField("number")}>NUMBER</button>
                            <button class="inputfield-button curser-button" onClick={() => handleAddField("email")}>EMAIL</button>
                            <button class="inputfield-button curser-button" onClick={() => handleAddField("password")}>PASSWORD</button>
                            <button class="inputfield-button curser-button" onClick={() => handleAddField("date")}>DATE</button>
                        </div>}

                        {formMode == "edit" && <div style={{ display: "flex", justifyContent: "center", margin: "2%" }}>
                            <button class="submit-button" onClick={() => handleUpdateForm()}>SUBMIT</button>
                        </div>
                        }

                    </div>
                    <FieldsEditor handlCurrentData={handlCurrentData} fieldValue={fieldValue} formName={formName} fieldPlaceHolderValue={fieldPlaceHolderValue} currentField={currentField} formEditedContent={formEditedContent} />
                </div>

            </div>




            {formMode == "create" && <div style={{ display: "flex", justifyContent: "center", margin: "4%" }}>
                <button class="submit-button" style={{ textAlign: "center" }}
                    onClick={() => handleCreateForm()}
                >CREATE FORM</button>
            </div>
            }

        </>
    )
}

export default CreateForm