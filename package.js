Package.describe({
  name: 'luixal:blaze-paginated-custom-list',
  version: '0.0.7',
  // Brief, one-line summary of the package.
  summary: 'Paginated Custom List for Meteor and Blaze',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/luixal/meteor-blaze-paginated-custom-list.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.1');
  api.use(['ecmascript@0.6.1', 'kurounin:pagination@1.0.13', 'kurounin:pagination-blaze@1.0.2', 'reactive-var@1.0.11']);
  api.use(['templating'], 'client');
  // html files:
  api.addFiles(['html/list.html', 'html/listItem.html'], 'client');
  // css files:
  api.addFiles('css/list.css', 'client');
  // js files:
  api.addFiles(['js/list.js', 'js/listItem.js'], 'client');
  // exporting pagination object:
  api.export('PaginatedCustomList', 'client');
});
