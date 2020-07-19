import React from 'react';

import './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = ["InputElement"];
    let validationError = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push("Invalid");
        validationError = <p>Please enter a valid value!</p>
    };

    switch (props.elementType) { // checking what kind of element/tag it is, maybe input tag or textarea html tag
        case ('input'): 
            inputElement = <input 
                className= {inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}
            />; 
        break;

        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}
            />;
        break;

        case ( 'select'  ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')} 
                    value={props.value}
                    onChange={props.changed}>
                    {/* value is a compulsory attr for elements */}
                    {props.elementConfig.options.map(option => ( // either use return or () to avoid the expected function call or return value
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            )
        break;

        default:  // ALT + Clicks let's you writing same code on multiple lines
            inputElement = <input 
                className={inputClasses.join(' ')}  
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} 
            />;
    }

    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            { inputElement }
            { validationError }
        </div>
    );
};

export default input;

// NOTE 
// inputElement = <textarea className="InputElement" {...props}/>
// {...props}  spreads the properties being passed into the props object
// from the input JSX component used in ContactData file/module/component
// the properties of the Jsx such as input name type placeholder 
// is being passed here into props and spread as properties of the prop obj
// having something like 
// const props = {
//     type: 'text/password/email',
//     name: 'name/password/email',
//     placeholder: 'Your email/Your name'
// }
// so the JSX attributes are being spread as properties into the props obj
