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

function createFilterFor (query) {
  return function filterFn (number) {
    return (number.title.toLowerCase().indexOf(query.toLowerCase()) > -1)
  }
}

function findTitle (input) {
  var titlePattern = /&amp;title=(.+?)&amp;/
  var titleMatch = titlePattern.exec(input)
  if (titleMatch && titleMatch.length === 2) {
    return decodeURIComponent(titleMatch[1]).replace(/\+/g, ' ')
  }
}

var superagent = Meteor.npmRequire('superagent')
var rootUrl = Meteor.settings.webOPAC.rootUrl

function findById (id) {
  var syncFetch = Meteor.wrapAsync(fetchCatalogItem)

  try {
    return syncFetch()
  } catch (e) {
    console.error(e)
    return null
  }

  function fetchCatalogItem (callback) {
    var url = rootUrl + '/start.do?Login=Internet&BaseURL=this&Query=0000=%22' + id + '%22'
    console.log(url)

    superagent
      .get(url)
      .end(function (err, res) {
        if (err) {
          return callback(err, null)
        }

        if (res.status !== 200) {
          return callback(new Error(res.status), null)
        }

        if (res.text.indexOf('noHitsText.jsp') > -1) {
          return callback(new Error('Not found!'), null)
        }

        if (res.text.indexOf('<!-- START jsp/result/hit.jsp -->') > -1) {
          var catalogItem = {
            title: findTitle(res.text)
          }

          return callback(null, catalogItem)
        }

        return callback(new Error('Could not parse response!'), null)
      })
  }
}

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

Meteor.startup(function () {
  var catalogItem = findById(362191)
  if (catalogItem) {
    console.log(catalogItem.title)
  }
})
