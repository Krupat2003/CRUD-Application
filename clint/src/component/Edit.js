import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Edit = () => {

    // const [getuserdata, setUserData] = useState([]);
    // console.log(getuserdata);

    const history = useHistory("");

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        desc: ""

    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const { id } = useParams("");
    console.log(id);

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
            setINP(data)
            console.log(" get data");
        }
    }

    useEffect(() => {
        getdata();
    }, []);

    const updateuser = async (e) => {
        e.preventDefault();

        const { name, email, work, add, mobile, desc, age } = inpval;

        const res2 = await fetch(`/updateuser/${id}`, {

            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name, email, work, add, mobile, desc, age
            })
        })
        const data2 = await res2.json();
        console.log(data2);

        if (res2.status === 422 || !data2) {
            alert("fill the data");
        } else {
            alert("data update");
            history.push("/");
        }
    }


    return (
        <div className='container'>
            <NavLink to="/" >Home2</NavLink>

            <form className='mt-4'>
                <div className='row'>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" className="form-label">Name</label>
                        <input type="taxt" name='name' value={inpval.name} onChange={setdata} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" className="form-label">Email</label>
                        <input type="email" name='email' value={inpval.email} onChange={setdata} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" className="form-label">age</label>
                        <input type="text" name='age' value={inpval.age} onChange={setdata} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" className="form-label">Mobile</label>
                        <input type="number" name='mobile' value={inpval.mobile} onChange={setdata} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" className="form-label">Work</label>
                        <input type="text" name='work' value={inpval.work} onChange={setdata} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" name='add' value={inpval.add} onChange={setdata} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Description</label>
                        <textarea name='desc' value={inpval.desc} onChange={setdata} className='form-control' id='' cols="30" rows="5">
                        </textarea>
                    </div>

                    <button type="submit" onClick={updateuser} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Edit;
