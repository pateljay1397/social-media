import {useState} from 'react';


export const useForm = (callback, initialState = {}) =>{
    const [values, setValues] = useState( initialState);

    const onChange = (Event) => {
        setValues({ ...values, [Event.target.name]: Event.target.value});
    };

    const onSubmit = Event =>{
        Event.preventDefault();
        callback();
    }

    return{
        onChange,
        onSubmit,
        values
    }
}