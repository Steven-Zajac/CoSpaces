import { useState } from 'react';

const useCalendarData = (newRes, userId) => {
    const [formData, setFormData] = useState(null);
    const [location, setLocation] = useState(null);

    const handleChangeDate = (newDate) => {
        if (newDate) {
            setFormData({
                ...formData,
                year: String(newDate.getFullYear()),
                month: String(newDate.getMonth()),
                day: String(newDate.getDate())
            })
        }
    };

    const handleDropDown = (e) => {
        if (e.target.value === 'selectOne') {
            return;
        }
        setLocation(e.target.value);
        setFormData({ 
            ...(newRes ? { userId: userId } : {}) , 
            location: e.target.value 
        });
    };
    return [formData, location, handleDropDown, handleChangeDate]; 
};

export default useCalendarData;