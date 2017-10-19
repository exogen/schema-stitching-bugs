# schema-stitching-bugs

This demo shows how `mergeSchemas` breaks the recursive nature of resolvers:
if a new field is added that should resolve to an object type, none of that
object type’s pre-existing resolvers will be called. For some reason, the
resolver for the new field is expected to return an object with object-resolved
values for each field.

## Instructions

```console
$ git clone git@github.com:exogen/schema-stitching-bugs.git
$ cd schema-stitching-bugs
$ yarn
$ node 1-makeExecutableSchema.js
$ node 2-addResolverFunctionsToSchema.js
$ node 3-mergeSchemas.js
```
