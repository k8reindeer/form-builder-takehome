import React from 'react';
import './App.css';
import FormBuilder from './FormBuilder';

const testForm = [{
  "tag": "input",
  "name": "first_name",
  "type": "text",
  "human_label": "First Name",
  "required": true
}, {
  "tag": "input",
  "name": "last_name",
  "type": "text",
  "human_label": "Last Name"
}, {
  "name": "middle_name",
  "type": "text",
  "human_label": "Middle Name (lots of people have that last name)",
  "conditional": (value) => {
    return value.last_name === "Smith";
  }
}, {
  "name": "ice_cream",
  "type": "select",
  "human_label": "Favorite Ice Cream Flavor",
  "options": [{ 
      "name": "vanilla",
      "human_label": "Vanilla"
    }, { 
      "name": "chocolate",
      "human_label": "Chocolate"
    }, { 
      "name": "mint_choc_chip",
      "human_label": "Mint Chocolate Chip"
    }, { 
      "name": "ricanelas",
      "human_label": "Bi-Rite Ricanelas"
    }]
}, {
  "tag": "input",
  "name": "email",
  "type": "email",
  "human_label": "Email Address"
}, {
  "tag": "input",
  "name": "phone_number",
  "type": "text",
  "human_label": "Phone Number"
}, {
  "tag": "input",
  "name": "job_title",
  "type": "text",
  "human_label": "Job Title"
}, {
  "tag": "input",
  "name": "date_of_birth",
  "type": "date",
  "human_label": "Date of Birth"
}, {
  "tag": "input",
  "name": "parental_consent",
  "type": "checkbox",
  "human_label": "Parental Consent",
  "conditional": (value) => {
    const now = new Date();
    return new Date(value.date_of_birth) >= new Date(now.getFullYear() - 13, now.getMonth(), now.getDate());
  }
}]


function App() {
  return (
    <div className="App">
      <h1> Test Dynamic Form</h1>
      <FormBuilder fields={testForm} submitCallback={(submission) => {
          console.log("Submit button clicked, here are your values:", submission);
        }}>
      </FormBuilder>
    </div>
  );
}

export default App;
