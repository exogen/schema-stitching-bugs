const { graphql } = require('graphql')
const { mergeSchemas, makeExecutableSchema } = require('graphql-tools')

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

const newResolvers = mergeInfo => ({
  Foo: {
    fooBar: () => ({ _internalValue: 13 })
  }
})

const newSchema = mergeSchemas({
  schemas: [schema, newTypeDefs],
  resolvers: newResolvers
})

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
    console.log('mergeSchemas')
    console.log('A resolver for fooBar is merged in, this should work just fine but fails:')
    console.log(result)
  })
  .catch(err => {
    console.log('Error:')
    console.log(err)
  })
