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

If you need more control over this publication, you can set this optional params that are passed to [`kurounin:pagination`](https://github.com/Kurounin/Pagination/) package:

```javascript
new Meteor.Pagination(MyCollection, {
  filters: {is_published: true},
  dynamic_filters: function () {
    return {user_id: this.userId};
  },
  transform_filters: function (filters, options) {
    // called after filters & dynamic_filters
    allowedKeys = ['_id', 'title'];
    return _.extend(
        _.pick(filters, allowedKeys),
        {user_id: this.userId}
    );
  }
  transform_options: function (filters, options) {
    const fields = { name: 1, email: 1 }
    if (Roles.userIsInRole(this.userId, 'admin')) {
        fields.deleted = 1;
    }
    return _.extend({fields}, options);
  }
});
```

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

And that's it, our paginated list shoud be showing up. You can see some examples screenshots in the examples section below or in the [examples repo](https://github.com/luixal/meteor-blaze-paginated-custom-list-example).

## Options

When providing the options object, there are some values that belong to this package and others that are inherited from @Kurounin packages and are just passed to those packages. Let's have a look at them:

- `template`: the name of the template used for rendering items.
- `collection`: the collection used to gather items from (the packages applies pagination on this collection)
- `ulClasses`: classes added to `ul` element,
- `liClasses`: classes added to `li` elements,
- `onItemClick`: function called when an item gets clicked. Gets the item as the only parameter.
- `paginationOptions`: this options belong to [`kurounin:pagination`](https://github.com/Kurounin/Pagination/) package.
  - `page`: set the initial page, for example the page parameter from url (defaults to 1)
  - `perPage`: set the number of documents to be fetched per page (defaults to 10)
  - `filters`: filters to be applied to the subscription (defaults to {}, meaning no filters)
  - `fields`: fields to be returned (defaults to {}, meaning all fields)
  - `sort`: set the sorting for retrieved documents (defaults to {_id: -1})
  - `debug`: console logs the query and options used when performing the find (defaults to false)
- `paginatorOptions`: this options belong to [`kurounin:pagination-blaze`](https://github.com/Kurounin/PaginationBlaze/) package (except the ```hide``` one).
  - `hide`: hides paginator (just if you want to use your own way to switch pages or show only one page)
  - `limit`: the maximum number of page links to display
  - `containerClass`: optional container class for the paginator
  - `onClick`: optional callback to be called when page link is clicked (default callback runs ```javascrip e.preventDefault())```. i.e: ```javascript function(e, templateInstance, clickedPage) {...}```

A complete example would be something like this:

```javascript
{
  template: 'book',
  collection: Books,
  ulClasses: 'books-list',
  liClasses: 'book-item',
  onItemClick: function(item) {
    console.log('Clicked book title: ' + item);
  },
  paginationOptions: {
    page: 1, // starting on page 1
    perPage: 5, // 5 items perpage
    filters: {active: true}, // publishing only active books
    fields: {title: 1, author: 1}, // no points published here
    sort: {title: 1}, // sorting items by title
    debug: true // showing debug messages in console
  },
  paginatorOptions: {
    hide: true, // no paginator shown
    limit: 3, // showing only 3 pages in paginator
    containerClass: 'paginator-container', // applies "paginator-container" as a class to the paginator
    onClick: function(e, templateInstance, clickedPage) {
      e.preventDefault();
      console.log('Changing page from ' + templateInstance.data.pagination.currentPage() + ' to ' + clickedPage);
    }
  }
}
```

## Examples

These examples use differente bootstrap themes from [bootswatch](http://bootswatch.com/). You can find them already packaged for Meteor in [Atmosphere](https://atmospherejs.com/).

You can find the code for this examples [here](https://github.com/luixal/meteor-blaze-paginated-custom-list-example)

#### Example 1
Uses bootswatch's theme [Sandstone](http://bootswatch.com/sandstone/).

![example_1_screenshot](https://github.com/luixal/meteor-blaze-paginated-custom-list-example/raw/master/screenshots/example_1.png)

#### Example 2
Uses bootswatch's theme [Superhero](http://bootswatch.com/superhero/)
.
![example_2_screenshot](https://github.com/luixal/meteor-blaze-paginated-custom-list-example/raw/master/screenshots/example_2.png)

#### Example 3
Uses bootswatch's theme [Simplex](http://bootswatch.com/simplex/).

![example_3_screenshot](https://github.com/luixal/meteor-blaze-paginated-custom-list-example/raw/master/screenshots/example_3.png)
