const { graphql } = require('graphql')
const {
  makeExecutableSchema,
  addResolveFunctionsToSchema
} = require('graphql-tools')

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
    value: source => source._internalValue
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
    console.log('addResolveFunctionsToSchema')
    console.log('Before adding, fooBar should resolve to null:')
    console.log(result.data)
  })
  .catch(err => {
    console.log('Error:')
    console.log(err)
  })

const newResolvers = {
  Foo: {
    fooBar: () => ({ _internalValue: 13 })
  }
}

addResolveFunctionsToSchema(schema, newResolvers)

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
    console.log('\naddResolveFunctionsToSchema')
    console.log('After adding, fooBar should resolve just fine:')
    console.log(result)
  })
  .catch(err => {
    console.log('Error:')
    console.log(err)
  })
