import React from 'react';

function FormField({field}) {
	console.log("rendering", field)
	return (<>
		<label>{field.human_label}
		<input type={field.type} name={field.name} ></input>
		</label>
	</>)
}

function FormBuilder({fields, submitCallback}) {
	console.log(fields);
  return (
    <form className="formContainer" onSubmit={(e) => {
    		console.log(e)
    		e.preventDefault();
    		submitCallback();
    	}}>
      {fields.map(f =>  <FormField key={f.name} field={f}/>)}
      <input type="submit"/>
    </form>
  );
}

export default FormBuilder;