import Autosuggest from 'react-autosuggest';

exports.getSuggestions = (value, students) => {
  console.log('ayayyyyyayaya');
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : students.filter(val =>
    val.studentName.toLowerCase().slice(0, inputLength) === inputValue
  );
};

exports.getSuggestionValue = suggestion => suggestion.studentName;

exports.renderSuggestion = suggestion => (
  <div>
    {suggestion.studentName}
  </div>
);