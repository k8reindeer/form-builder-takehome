import React from 'react';
import {useState} from 'react';
import _ from 'lodash';
import './FormBuilder.css';

/* Display logic for a single form field. A controlled component */
function FormField({field, value, onChange}) {
	return (<div className="field">
		<label>{field.human_label} {field.required && <span className="required">*</span>}</label>
		{field.type === "select" ?
			<select
				required={field.required}
				name={field.name}
				value={value}
				onChange={onChange}>
				<option disabled value=""> (select an option) </option>
				{
					field.options.map((o) => 
						<option key={o.name} value={o.name}>
							{o.human_label}
						</option>
					)
				}
			</select> :
			<input
				required={field.required}
				type={field.type}
				name={field.name}
				value={value}
				onChange={onChange} />
			}
	</div>)
}

/* The core form builder
 *
 * fields is an array of fields, each an object with the following keys:
 * - name; the machine readable name for this field
 * - human_label; the text for the label to display
 * - required; boolean whether the field is required to be filled out
 * - type; input type, supports everything the <input> element supports
 *     as well as the special value "select"
 * - options; a list of objects with keys
 *     name; machine-readable name for the option that will be used in the form's state
 *     human_label; the text to display with this option
 *     if type is "select", options must be provided.
 * - conditional (optional); a function that takes the
 *     form's state and returns a boolean;
 *     the field will only be shown if the conditional
 *     function is true for the form's current state.
 *
 * submitCallback is a function that is called whenever the form is submitted,
 *      with the form's current state as an input
 *
 * the form's state (as provided to submitCallback and conditional functions)
 * is a javascript object whose keys are the "name" of each field and whose values are
 * the current value the form has for that field.
 */
function FormBuilder({fields, submitCallback}) {
	const [value, setValue] = useState({});

	const onChange = (e) => {
		setValue({
			...value, // Don't change the other values, just the one that's changed
			[e.target.name]: e.target.value
		})
	}

	const onSubmit = (e) => {
		e.preventDefault();
		submitCallback(value);
	}

	const shouldShowField = (f) => {
		if (f.conditional === undefined) {
			// If there's no conditional, always show the field
			return true
		}
		return f.conditional(value)
	}

  return (
    <form className="Form" onSubmit={onSubmit}>
      {fields.map(f => {
      	return (
      		shouldShowField(f) && <FormField 
      			key={f.name} 
      			field={f} 
      			value={_.get(value, f.name, '')} 
      			onChange={onChange}/>
      	)
    	})}
      <input type="submit"/>
    </form>
  )
}

export default FormBuilder;