const { graphql } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `

type Foo {
  name: String!
  value: String!
  fooBar: Bar
}

type Bar {
  name: String!
  value: String!
}

type Query {
  foo: Foo
}

`

const resolvers = {
  Foo: {
    name: () => 'foo.',
    value: source => source._internalValue,
    fooBar: () => ({ _internalValue: 13 })
  },
  Bar: {
    name: () => 'bar.',
    value: source => source._internalValue
  },
  Query: {
    foo: () => ({ _internalValue: 5 })
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

graphql(
  schema,
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
    console.log('makeExecutableSchema')
    console.log('fooBar resolves just fine:')
    console.log(result)
  })
  .catch(err => {
    console.log('Error:')
    console.log(err)
  })
