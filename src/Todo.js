import React, { useState } from 'react';

export default function Todo(props) {
    const [task, setTask] = useState('');
    const [allData, setAllData] = useState([]);
    const [showButton, setShowButton] = useState(null);
    const [editIndex, setEditIndex] = useState();
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (index) => {
        setEditIndex(index);
        setIsEditing(true);
        setTask(allData[index]);
    }

    const handleChange = (event) => {
        setTask(event.target.value);
    }

    const handleSubmit = () => {
        if (task === '') return;
        if (isEditing) {
            allData[editIndex] = task;
            setTask('');
            setIsEditing(false);
            props.editSuccess();
        } else {
            setAllData((preVal) => { return [...preVal, task]; })
            props.addSuccess();
            setTask('');
        }
    }

    const handleDelete = (index) => {
        let temp = [...allData];
        temp.splice(index, 1);
        setAllData(temp);
        props.deleteSuccess();
    }

    const currTime = new Date().toLocaleTimeString();
    const currDate = new Date().toDateString();

    return (
        <>
            <div className='container mt-5 p-2 text-center' style={{ backgroundColor: 'rgba(226, 216 ,216,0.5)' }}>
                <div className='header d-flex align-items-center justify-content-center mb-2'>
                    {/* <img src='https://cdn2.vectorstock.com/i/1000x1000/65/56/alarm-clock-app-dark-mode-glyph-icon-vector-36486556.jpg' alt='logo' className='mx-1' style={{ height: '10vmin' }} /> */}
                    <h1 className='mt-3' style={{fontFamily:'cursive'}}>TO-DO LIST</h1> 
                    
                </div>
                <h5 className='mt-3'>{currDate}</h5>
                <h5 className=''>{currTime}</h5>

                <div className='mt-4 p-3 container mb-5' style={{ borderRadius: '20px', boxShadow: '3px 5px 15px -5px black', maxWidth: '500px', margin: '0 auto', backgroundColor: 'rgba(226, 216 ,216,0.5)' }}>
                    <div className="input-group p-2">
                        <input type='text' name='Task' className='form-control' placeholder='Enter Task' onChange={handleChange} value={task} style={{borderRadius:'5px'}}/>
                        <button type='button' className='btn btn-dark mx-2' onClick={handleSubmit} style={{ boxShadow: '3px 5px 6px -5px black', borderRadius: '5px' }}>{isEditing ? "Update" : "Add Task"}</button>
                    </div>
                    <ul className='mt-2 list list-unstyled'>
                        {allData.map((item, index) => (
                            <li
                                className=' mb-2 p-2 position-relative'
                                onMouseEnter={() => setShowButton(index)}
                                onMouseLeave={() => setShowButton(null)}
                                key={index}
                                style={{ wordBreak: 'break-word', position: 'relative' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <h6 style={{ fontSize: '20px', flex: 1 }}>{item}</h6>
                                    {showButton === index && (
                                        <div style={{ display: 'flex' }}>
                                            <button onClick={() => handleEdit(index)} className='btn p-1 mx-1'>
                                                <i className='fa fa-pencil' style={{ fontSize: '20px' }}></i>
                                            </button>
                                            <button onClick={() => handleDelete(index)} className='btn p-1 mx-1'>
                                                <i className="fa fa-trash-o" style={{ fontSize: '20px' }}></i>
                                            </button>

                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
