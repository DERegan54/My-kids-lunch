import React, {useState, useContext} from 'react';
import Alert from '../common/Alert';
import UserContext from '../users/UserContext';
import MklApi from '../api';

const AddLunchForm = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const initialState = {
        title: "",
        description: "", 
        protein: "",
        carb: "",
        fruit: "",
        vegetable: "",
        fat: "",
        sweet: "",
        beverage: "",
    }

    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);
    const [lunchAdded, setLunchAdded] = useState(false);

    // Handles form submit
    async function handleSubmit(evt) {
        evt.preventDefault();
        let data = {
            title: formData.title,
            description: formData.description,
            protein: formData.protein,
            carb: formData.carb,
            fruit: formData.fruit,
            vegetable: formData.vegetable,
            fat: formData.fat,
            sweet: formData.sweet,
            beverage: formData.beverage,
        };
        let newLunch;
        try {
            newLunch = await MklApi.createLunch(data);
        } catch (errors) {
            setFormErrors(errors);
            return;
        }
        setFormData(data => ({...data}));
        setFormErrors([]);
        setLunchAdded(true);
    }

    // Updates form fields on change
    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormData(data => ({...data, [name]: value}));
        setFormErrors([]);
    }

    return (
        <div className='AddLunchForm'>
            <h2>Add a Lunch to your Lunchbox</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title: </label>
                <input 
                    className='AddLunchForm-title'
                    type='text'
                    name='title'
                    id='title'
                    placeholder='Add a title'
                    value={formData.title}
                    onChange={handleChange}>
                </input>
                <br></br>
                <label htmlFor='title'>Description: </label>
                <input 
                    className='AddLunchForm-description'
                    type='text'
                    name='description'
                    id='description'
                    placeholder='Describe this lunch'
                    value={formData.description}
                    onChange={handleChange}>
                </input>
                <br></br>
                <label htmlFor='title'>Protein: </label>
                <input 
                    className='AddLunchForm-protein'
                    type='text'
                    name='protein'
                    id='protein'
                    placeholder='Add a protein'
                    value={formData.protein}
                    onChange={handleChange}>
                </input>
                <br></br>
                <label htmlFor='title'>Carb: </label>
                <input 
                    className='AddLunchForm-carb'
                    type='text'
                    name='carb'
                    id='carb'
                    placeholder='Add a carb'
                    value={formData.carb}
                    onChange={handleChange}>
                </input>
                <br></br>
                <label htmlFor='title'>Fruit: </label>
                <input 
                    className='AddLunchForm-fruit'
                    type='text'
                    name='fruit'
                    id='fruit'
                    placeholder='Add a fruit'
                    value={formData.fruit}
                    onChange={handleChange}>
                </input>
                <br></br>
                <label htmlFor='title'>Vegetable: </label>
                <input 
                    className='AddLunchForm-fruit'
                    type='text'
                    name='vegetable'
                    id='vegetable'
                    placeholder='Add a vegetable'
                    value={formData.vegetable}
                    onChange={handleChange}>
                </input>
                <br></br>
                <label htmlFor='title'>Fat: </label>
                <input 
                    className='AddLunchForm-fat'
                    type='text'
                    name='fat'
                    id='fat'
                    placeholder='Add a fat'
                    value={formData.fat}
                    onChange={handleChange}>
                </input>
                <br></br>
                <label htmlFor='title'>Sweet: </label>
                <input 
                    className='AddLunchForm-sweet'
                    type='text'
                    name='sweet'
                    id='sweet'
                    placeholder='Add a sweet'
                    value={formData.sweet}
                    onChange={handleChange}>
                </input>
                <br></br>
                <label htmlFor='title'>Beverage: </label>
                <input 
                    className='AddLunchForm-beverage'
                    type='text'
                    name='beverage'
                    id='beverage'
                    placeholder='Add a beverage'
                    value={formData.beverage}
                    onChange={handleChange}>
                </input>
                <br></br>
                <button type="submit" onSubmit={handleSubmit}>Add Lunch!</button>
                {formErrors.length ? <Alert messages={formErrors} /> : null}
                    {lunchAdded ? <Alert messages={["Lunch added successfully"]} /> : null}
            </form>
        </div>
    );
}

export default AddLunchForm;