import { useRef, useState } from 'react';

function SimpleInput (props) {
    const nameInputRef = useRef();
    const [enteredName, setEnteredName] = useState('');
    const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);

    function nameInputChangeHandler (event) {
        setEnteredName(event.target.value);
    };

    function formSubmissionHandler (event) {
        event.preventDefault();

        if(enteredName.trim() === '') {
            return setEnteredNameIsValid(false)
        }

        console.log(enteredName);

        const enteredValue = nameInputRef.current.value;
        console.log(enteredValue);

        // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
        setEnteredName('');
    };

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className='form-control'>
                <label htmlFor='name'>Your Name</label>
                <input
                    ref={nameInputRef}
                    type='text'
                    id='name'
                    onChange={nameInputChangeHandler}
                    value={enteredName}
                />
                {!enteredNameIsValid && <p className="error-text">Name must not be empty</p>}
            </div>
            <div className='form-actions'>
                <button>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
