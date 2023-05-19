import React, { useState } from 'react';

export default function Todo(props) {
    const [task, setTask] = useState('');
    const [allData, setAllData] = useState([]);
    const [showButton, setShowButton] = useState(false)
    const [editIndex, setEditIndex] = useState()
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = (index) => {
        // let temp = [...allData]
        setEditIndex(index)
        setIsEditing(true)
        setTask(allData[index])
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
        temp.splice(index, 1)
        setAllData(temp);
        props.deleteSuccess();
    }

    const ShowBtn = () => {
        setShowButton(true);
    }

    const hideBtn = () => {
        setShowButton(false);
    }
    const currTime = new Date().toLocaleTimeString();
    const currDate = new Date().toDateString();
    return (
        <>

            <div className='container mt-4 p-3 text-white'>
                <div className='header d-flex align-items-center justify-content-center'>
                    <img src='https://cdn2.vectorstock.com/i/1000x1000/65/56/alarm-clock-app-dark-mode-glyph-icon-vector-36486556.jpg' alt='logo' className='logo' style={{ height: '10vmin' }} />
                    <h1>TO-DO </h1>

                </div>
                <h6 className='text-white'>{currDate}</h6>
                <h6 className='text-white'>{currTime}</h6>

                <div className='bg-light mt-4 p-1 container w-50' style={{ borderRadius: '20px', boxShadow: '3px 5px 15px -5px black' }}  >
                    <input type='text' name='Task' className='mt-2 form-control w-75 d-inline' placeholder='Enter Task' onChange={handleChange} value={task} />
                    <button type='button' className='btn btn-dark ms-2 ' onClick={handleSubmit} style={{ boxShadow: '3px 5px 6px -5px black' }}>{isEditing ? "Update" : "Add Task"}</button>
                    <center>
                        <ul className='mt-2 text-center list list-unstyled w-75 '>
                            {allData.map((item, index) => {
                                return (
                                    <li className='text-light mb-2 bg-secondary p-2' onMouseEnter={ShowBtn} onMouseLeave={hideBtn}>
                                        <span style={{ fontSize: '20px' }}>{item}</span>

                                        {showButton &&
                                            <>
                                                <button onClick={() => handleDelete(index)} className='btn' style={{ float: 'right' }}>
                                                    <i className="fa fa-trash-o" style={{ fontSize: '20px' }}></i>
                                                </button>
                                                <button onClick={() => handleEdit(index)} className='btn' style={{ float: 'right' }}>
                                                    <i className='fa fa-pencil' style={{ fontSize: '20px' }}></i>
                                                </button>
                                            </>
                                        }
                                    </li>
                                )
                            })}
                        </ul>
                    </center>
                </div>
            </div>
        </>
    )
}
