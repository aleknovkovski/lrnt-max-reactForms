import { useState } from 'react';
import useInput from "../hooks/use-input";

function SimpleInput (props) {
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput
    } = useInput(value => value.trim() !== '');

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

    const enteredEmailIsValid = enteredEmail.trim() !== '' && enteredEmail.includes('@') !== false;
    const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
    const emailInputClasses = emailInputIsInvalid
        ? 'form-control invalid'
        : 'form-control';

    let formIsValid = false;
    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    function emailInputChangeHandler (event) {
        setEnteredEmail(event.target.value);
    };

    const emailInputBlurHandler = event => {
        setEnteredEmailTouched(true);
    };

    function formSubmissionHandler (event) {
        event.preventDefault();

        if (!enteredNameIsValid) {return;}
        resetNameInput()
        console.log(enteredName);

        setEnteredEmail('');
        setEnteredEmailTouched(false);
    }

    const nameInputClasses = nameInputHasError
        ? 'form-control invalid'
        : 'form-control';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    onChange={nameChangedHandler}
                    onBlur={nameBlurHandler}
                    value={enteredName}
                />
                {nameInputHasError && <p className="error-text">Name must not be empty</p>}
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
