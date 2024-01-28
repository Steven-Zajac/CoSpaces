import { useState } from 'react';

const useFormData = () => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { id, value} = e.target;
        setFormData(formData => ({ ...formData, [id]: value }));
    };
    return [formData, handleChange];
};

export default useFormData;