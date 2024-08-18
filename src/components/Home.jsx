import React, { useEffect, useState } from 'react'
import '../App.css';
import FormsList from './FormsList';
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const handleViewer = (id) => {
        navigate(`/form/${id}`); 
    };

    const handleDelete = async (id) => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:4000/api/form/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Item deleted successfully');
                fetchData()
            } else {
                setLoading(false)
                throw new Error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false)
        }

    }

    const fetchData = () => {
        fetch('http://localhost:4000/api/form')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                // setError(error);
                setLoading(false);
            });
    }
    useEffect(() => {
        fetchData()
    }, []);

    return (<>
        {loading ? <h1>Loading....</h1> : (<>
                    <div className='homepage_header'>
                        <h3 >Welcome to Form.com</h3>
                        <p >This is a Simple Form Bulider</p>
                        <button className='homebutton' onClick={() => handleViewer(`new`)}>Create New Form</button>
                        <hr></hr>
                    </div>
                    {data &&
                        (<> <div className='homepage_content'>
                            <FormsList data={data} handleDelete={handleDelete} />
                        </div>

                        </>)}
        </>)}
    </>)
}

export default Home