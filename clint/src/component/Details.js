import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const Details = () => {

    const [getuserdata, setUserData] = useState([]);
    console.log(getuserdata);

    const { id } = useParams("");
    console.log(id);

    const history = useHistory();

    const getdata = async () => {

        const res = await fetch(`/getuser/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }

        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error");

        } else {
            setUserData(data)
            console.log(" get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {
        const res2 = await fetch(`/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        });
        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            // getdata();
            history.push("/");
        }
    }


    return (
        <div className='container mt-3'>
            <h1 style={{ fontWeight: 400 }}>Welcome Krupa Timbadiya</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className='row'>
                        <div className='add_btn mx-2'>
                            <NavLink to={`/edit/${getuserdata._id}`}><button className='btn btn-primary mx-2'><i class="fa-solid fa-pen"></i></button></NavLink>
                            <button className='btn btn-danger' onClick={() => deleteuser(getuserdata._id)}><i class="fa-solid fa-trash"></i></button>
                        </div>
                        <div className='left_view col-lg-6 col-md-6 col-12'>
                            <img src='https://e7.pngegg.com/pngimages/674/524/png-clipart-professional-computer-icons-avatar-job-avatar-heroes-computer.png' style={{ width: 60 }} alt='profile' />
                            <h3 className='mt-3'> Name: <span>{getuserdata.name} </span> </h3>
                            <h3 className='mt-3'> Age: <span>{getuserdata.age}</span> </h3>
                            <p className='mt-3'><i class="fa-solid fa-envelope"></i>   Email: <span>{getuserdata.email}</span></p>
                            <p className='mt-3'> <i class="fa-solid fa-laptop-file"></i> Occuption <span>{getuserdata.work}</span></p>
                        </div>
                        <div className='right_view  col-lg-6 col-md-6 col-12 mt-4'>
                            <p className='mt-5'><i class="fa-solid fa-mobile-screen"></i> mobile: <span>{getuserdata.mobile}</span></p>
                            <p className='mt-3'><i class="fa-solid fa-location-dot"></i> location: <span>{getuserdata.add}</span></p>
                            <p className='mt-3'> Description: <span>{getuserdata.desc}</span></p>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}
export default Details;
