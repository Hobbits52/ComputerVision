
exports.getSuggestions = function(value, students) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : students.filter(val =>
    val.studentName.toLowerCase().slice(0, inputLength) === inputValue
  );
};

exports.getSuggestionValue = function(suggestion) {
  suggestion.studentName;
};

exports.onChange = function(event, { newValue }) {
  this.setState({
    value: newValue
  });
};

exports.onSuggestionsFetchRequested = function({ value }) {
  this.setState({
    suggestions: this.getSuggestions(value, this.state.decoratedStudents)
  });
};

exports.onSuggestionsClearRequested = function() {
  this.setState({
    suggestions: []
  });
}

exports.clearSelection = function() {
  this.setState({
    suggestions: [],
    value: ''
  })
}

