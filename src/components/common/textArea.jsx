import React from 'react';

const TextArea = ({ name, type, value, label, onChange, error }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}
                className="form-label">
                {label}
            </label>

            <textarea id={name}
                value={value}
                onChange={onChange}
                type={type}
                className="form-control">
            </textarea>

            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default TextArea;