Meteor.methods({
  'findNumber': findNumber
})

var NUM_MAX_RESULTS = 5

var NUMBERS = [
  {title: 'One'},
  {title: 'Two'},
  {title: 'Three'},
  {title: 'Four'},
  {title: 'Five'},
  {title: 'Six'},
  {title: 'Seven'},
  {title: 'Eight'},
  {title: 'Nine'}
]

function findNumber (query) {
  var results

  if (query) {
    results = NUMBERS.filter(createFilterFor(query))
  } else {
    results = NUMBERS
  }

  results = results.slice(0, NUM_MAX_RESULTS)

  return results
}

function createFilterFor (query) {
  return function filterFn (number) {
    return (number.title.toLowerCase().indexOf(query.toLowerCase()) > -1)
  }
}
