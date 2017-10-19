const { graphql } = require('graphql')
const a = require('./a')
const b = require('./b')
const merged = require('./merged')

graphql(
  a,
  `
    {
      foo {
        name
        value
      }
    }
  `
)
  .then(result => {
    console.log(result)
  })
  .catch(err => {
    console.log('Error:')
    console.log(err)
  })

graphql(
  b,
  `
    {
      bar {
        name
        value
      }
    }
  `
)
  .then(result => {
    console.log(result)
  })
  .catch(err => {
    console.log('Error:')
    console.log(err)
  })

graphql(
  merged,
  `
    {
      foo {
        name
        value
        fooBar {
          name
          value
        }
      }
    }
  `
)
  .then(result => {
    console.log(result)
  })
  .catch(err => {
    console.log('Error:')
    console.log(err)
  })
