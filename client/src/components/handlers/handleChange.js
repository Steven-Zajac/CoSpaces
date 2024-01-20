import { useState } from 'react';

const [formData, setFormData] = useState({});

const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    return formData;
};

export default handleChange;