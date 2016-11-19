/*
`options`: {
  `template`: template used for rendering list items
  `collection`: collection used,
  `ulClasses`: classes applied to `ul`,
  `liClasses`: classes applied to `li`,
  `onItemClick`: function to run when an items gets clicked. Gets item data as param. i.e: function(item) {...}
  `paginationOptions`: {
    `page`: set the initial page, for example the page parameter from url (defaults to 1)
    `perPage`: set the number of documents to be fetched per page (defaults to 10)
    `filters`: filters to be applied to the subscription (defaults to {}, meaning no filters)
    `fields`: fields to be returned (defaults to {}, meaning all fields)
    `sort`: set the sorting for retrieved documents (defaults to {_id: -1})
    `debug`: console logs the query and options used when performing the find (defaults to false)
  },
  `paginatorOptions`: {
    `hide`: hides paginator (just if you want to use your own way to switch pages or show only one page)
    `limit`: the maximum number of page links to display
    `containerClass`: optional container class for the paginator
    `onClick`: optional callback to be called when page link is clicked (default callback runs e.preventDefault()). i.e: function(e, templateInstance, clickedPage) {...}
  }
}
*/
var options;

Template.list.onCreated(function() {
  options = this.data.options;
  // creating pagination object:
  if (options.collection) {
    this.pagination = new Meteor.Pagination(
      options.collection,
      options.paginationOptions
    )
  }
});

Template.list.helpers({

  'template': function() {
    return options.template;
  },

  'onItemClick': function() {
    return options.onItemClick;
  },

  'liClasses': function() {
    return options.liClasses;
  },

  'templatePagination': function() {
    return Template.instance().pagination;
  },

  'items': function() {
    if (Template.instance().pagination) return Template.instance().pagination.getPage()
  }

});
