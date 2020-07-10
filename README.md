# form-builder-takehome

Take home coding assignment for a company that shall not be named ;)

## Time Spent
1h15m initially on opening the problem
long break for cooking/baking/dinner
30m adjusting styling and adding features

## Decisions
The output (what's the value of the field?) is provided to the calling code of this form builder via a callback on submission. The problem statement said "return" but that doesn't make much sense in React; the callback provides the form content when the caller is most likely to use it

I changed the data structure for conditionals from the example; in the example, your condition could only condition on the value of a single other field. In this implementation, the condition function recieves the entire state of the form to make its decision, so it could say "if field x is non-empty and also field y is checked." This could get you into trouble if you're not careful, though, because you get the value of your own field as well, so a poorly written condition function could cause the field you're editing to disappear... this is a bit of a sharp edge, but I think worth it for the increased flexibility of the API.

Required fields: I did a first pass using the <input> required attribute. On my latest version of Chrome, this is actually showing me a nice validation message out of the box; if the form builder component wanted to customize that more we could add "novalidate" and take over control of validation UI ourselves. 

Responsive UI: since it wasn't mentioned in the rubric, I didn't worry much about this working at small screen widths (see: min-width: 600px in App.css). Could add some media queries and make the labels appear between the fields rather than to the left if a mobile use case was important.