import React from 'react';
import Layout from './../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';





const Dashboard = () => {
    const {user: {_id, name, email, role}} = isAuthenticated();
    const userLinks = () =>{
        return(
            <div className="card">
                <h4 className='card-header'style={{background:"#333", color:'white'}}>User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to ="/cart">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to ="/profile/update">Update Profile</Link>

                    </li>
                    
                </ul>
            </div>
        )
    }

    const userInfo = () =>{
        return(
            <div className="card mb-5">
                <h3 className="card-header" style={{background:"#333", color:'white'}} >User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">Name: {name}</li>
                    <li className="list-group-item">Email: {email}</li>
                    <li className="list-group-item">Role: {role === 1 ? 'Admin':'Registered User'}</li>
                </ul>

            </div>
        );
    };
    const purchaseHistory = ()=>{
        return(
            <div className="card mb-5">
                <h3 className="card-header" style={{background:"#333", color:'white'}}>Purchare history</h3>
                <ul className="list-group">
                    <li className="list-group-item">history</li>
                </ul>
            </div>
        )
    }
    return(
        <Layout title="Dashboard" description={`Hello ${name}.`} className="container">
            <div className="row">
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory()}
                </div>


            </div>
           

        </Layout>
    )
}
export default Dashboard;