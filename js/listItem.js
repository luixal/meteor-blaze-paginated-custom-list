Template.listItem.events({
  'click .luixal-list-item': function(event) {
    event.preventDefault();
    if (this.onItemClick) this.onItemClick(this.item);
  }
});
