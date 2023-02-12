import { useState } from 'react';

function SimpleInput (props) {
    const [enteredName, setEnteredName] = useState('');
    const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);
    const [enteredNameTouched, setEnteredNameTouched] = useState(false);

    function nameInputChangeHandler (event) {
        setEnteredName(event.target.value);
    };

    const nameInputBlurHandler = event => {
        setEnteredNameTouched(true);

        if (enteredName.trim() === '') {
            return setEnteredNameIsValid(false);
        }
    };

    function formSubmissionHandler (event) {
        event.preventDefault();

        setEnteredNameTouched(true);

        if(enteredName.trim() === '') {
            return setEnteredNameIsValid(false)
        }

        setEnteredNameIsValid(true)
        console.log(enteredName);

        setEnteredName('');
    };

    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
    const nameInputClasses = nameInputIsInvalid
        ? 'form-control invalid'
        : 'form-control';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    onChange={nameInputChangeHandler}
                    onBlur={nameInputBlurHandler}
                    value={enteredName}
                />
                {nameInputIsInvalid && <p className="error-text">Name must not be empty</p>}
            </div>
            <div className='form-actions'>
                <button>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
