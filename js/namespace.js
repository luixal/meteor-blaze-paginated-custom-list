Paginations = new ReactiveVar({});

PaginatedCustomList = {
  getPagination: function(collectionName) {
    if (Paginations && Paginations.get()[collectionName]) return Paginations.get()[collectionName].get();
  }
}
