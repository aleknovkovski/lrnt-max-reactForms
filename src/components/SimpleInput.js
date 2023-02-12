import { useState } from 'react';

function SimpleInput (props) {
    const [enteredName, setEnteredName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredNameTouched, setEnteredNameTouched] = useState(false);
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

    const enteredNameIsValid = enteredName.trim() !== '';
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
    const nameInputClasses = nameInputIsInvalid
        ? 'form-control invalid'
        : 'form-control';

    const enteredEmailIsValid = enteredEmail.trim() !== '' && enteredEmail.includes('@') !== false;
    const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
    const emailInputClasses = emailInputIsInvalid
        ? 'form-control invalid'
        : 'form-control';

    let formIsValid = false;
    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    function nameInputChangeHandler (event) {
        setEnteredName(event.target.value);
    };

    function emailInputChangeHandler (event) {
        setEnteredEmail(event.target.value);
    };


    const nameInputBlurHandler = event => {
        setEnteredNameTouched(true);
    };

    const emailInputBlurHandler = event => {
        setEnteredEmailTouched(true);
    };


    function formSubmissionHandler (event) {
        event.preventDefault();

        setEnteredNameTouched(true);

        if (!enteredNameIsValid) {return;}

        console.log(enteredName);

        setEnteredName('');
        setEnteredNameTouched(false);

        setEnteredEmail('');
        setEnteredEmailTouched(false);
    }

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
            <div className={emailInputClasses}>
                <label htmlFor='email'>Your Email</label>
                <input
                    type='email'
                    id='email'
                    onChange={emailInputChangeHandler}
                    onBlur={emailInputBlurHandler}
                    value={enteredEmail}
                />
                {emailInputIsInvalid && <p className="error-text">Email must be a valid email address</p>}
            </div>
            <div className='form-actions'>
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
