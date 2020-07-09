import React from 'react';
import {useState} from 'react';
import _ from 'lodash';
import './FormBuilder.css';


function FormField({field, value, onChange}) {
	return (<div className="field">
		<label>{field.human_label}</label>
		<input 
			type={field.type} 
			name={field.name}
			value={value}
			onChange={onChange} />
	</div>)
}

function FormBuilder({fields, submitCallback}) {
	const [value, setValue] = useState({});

	const onChange = (e) => {
		setValue({
			...value, 
			[e.target.name]: e.target.value
		})
	}

	const onSubmit = (e) => {
		e.preventDefault();
		submitCallback(value);
	}

	const shouldShowField = (f) => {
		if (f.conditional === undefined) {
			// Always show a field with no conditionals
			return true
		}
		const conditional_value = _.get(value, f.conditional.name, '');
		return f.conditional.show_if(conditional_value)
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