import { useRef, useState } from 'react';

function SimpleInput (props) {
    const nameInputRef = useRef();
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

        const enteredValue = nameInputRef.current.value;
        console.log(enteredValue);

        // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
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
                    ref={nameInputRef}
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
