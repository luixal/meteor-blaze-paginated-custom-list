/*
`options`: {
  `template`: template used for rendering paginatedCustomList items
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

Template.paginatedCustomList.onCreated(function() {
  // saving options to local reactive var:
  this.options = new ReactiveVar(this.data.options);
  // creating pagination as local reactive var:
  this.pagination = new ReactiveVar(
    new Meteor.Pagination(
    this.data.options.collection,
    this.data.options.paginationOptions
    )
  );
});

Template.paginatedCustomList.helpers({

  'template': function() {
    return Template.instance().options.get().template;
  },

  'onItemClick': function() {
    return Template.instance().options.get().onItemClick;
  },

  'liClasses': function() {
    return Template.instance().options.get().liClasses;
  },

  'templatePagination': function() {
    return Template.instance().pagination.get();
  },

  'items': function() {
    let pagination = Template.instance().pagination.get();
    if (pagination) return pagination.getPage();
  }

});
