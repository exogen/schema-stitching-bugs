const { graphql, parse, extendSchema } = require('graphql')
const {
  makeExecutableSchema,
  addResolveFunctionsToSchema
} = require('graphql-tools')

const typeDefs = `

type Foo {
  name: String!
  value: String!
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

const newTypeDefs = `

extend type Foo {
  fooBar: Bar
}

`

const newResolvers = {
  Foo: {
    fooBar: () => ({ _internalValue: 13 })
  }
}

const newSchema = extendSchema(schema, parse(newTypeDefs))

graphql(
  newSchema,
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
    console.log('extendSchema')
    console.log('Before adding the resolver, fooBar should be null:')
    console.log(result)
  })
  .catch(err => {
    console.log('Error:')
    console.log(err)
  })

addResolveFunctionsToSchema(newSchema, newResolvers)

graphql(
  newSchema,
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
    console.log('\nextendSchema')
    console.log('After adding the resolver, fooBar resolves just fine:')
    console.log(result.data)
  })
  .catch(err => {
    console.log('Error:')
    console.log(err)
  })
