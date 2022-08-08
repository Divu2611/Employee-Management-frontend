import React from 'react';

const Card = ({ data }) => {
    return (
        <div>
            {data.map(item => (
                <div className="card mt-5" key={item._id}>
                    <div className="card-header">
                        <h2 className="mx-3">{item.title}</h2>
                    </div>

                    <div className="card-body px-5 py-5 bg-white text-black login-right-container">
                        <h4>{item.body}</h4>
                    </div>

                    <div className="card-footer">
                        <div><h5>Created By: {item.author}</h5></div>
                        <div><h5>Date: {item.date}</h5></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card;