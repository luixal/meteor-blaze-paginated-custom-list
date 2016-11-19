# luixal:blaze-paginated-custom-list
Meteor package for rendering paginated lists using custom template for each item.

Dependences:
* [`kurounin:pagination`](https://github.com/Kurounin/Pagination/) for pagination.
* [`kurounin:pagination-blaze`](https://github.com/Kurounin/PaginationBlaze/) for the paginator.

Thanks @Kurounin, those are great packages!
## Install
Like any other meteor package, you can install using:

    meteor add luixal:blaze-paginated-custom-list

## Usage
As learning by example is great, let's say we want to show a list with the docs in my (already defined) `Books` collection.

First, we need to publish the pagination for the `Books` collection so, in the server, where I'm publishing this collection, we need to add this line:
```javascript
new Meteor.Pagination(Books);
```
This is all that is needed in the `server` side. Following steps will all be done in `client` files :)

Next thing we need to do (now or later) is building a template for each element of the list. This could be one simple example (i'm using bootstrap classes here):

```html
<template name="book">
  <div class="panel panel-default">
    <div class="panel-body">
      "{{title}}" by {{author}} ({{points}} points)
    </div>
  </div>
</template>
```

Now that our item's template is ready, we add the list to our Books template, like this:

```html
{{> paginatedCustomList options=options}}
```
we also need to define a helper for providing that `options` value. This could be simple one:

```javascript
'options': function() {
  return {
    template: 'book',
    collection: Books,
    paginationOptions: {
      perPage: 5,
      sort: {
        name: -1
      }
    },
    paginatorOptions: {
      limit: 4,
      containerClass: 'pull-right'
    },
    onItemClick: function(item) {
      console.log(item);
    }
  }
}
```

And that's it, our paginated list shoud be showing up like.
