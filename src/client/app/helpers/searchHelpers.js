
exports.getSuggestions = function(value, students) {
  console.log('getSuggestions', students);
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : students.filter(val =>
    val.studentName.toLowerCase().slice(0, inputLength) === inputValue
  );
};

exports.getSuggestionValue = function(suggestion) {
  console.log('1');
  suggestion.studentName;
};

exports.onChange = function(event, { newValue }) {
  console.log('2');
  this.setState({
    value: newValue
  });
};

exports.onSuggestionsFetchRequested = function({ value }) {
  console.log('3', this.state.decoratedStudents);
  this.setState({
    suggestions: this.getSuggestions(value, this.state.decoratedStudents)
  });
};

exports.onSuggestionsClearRequested = function() {
  console.log('4');
  this.setState({
    suggestions: []
  });
}

exports.clearSelection = function() {
  console.log('5');
  this.setState({
    suggestions: [],
    value: ''
  })
}

