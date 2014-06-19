Freelancer.Views.InvoicesIndex = Backbone.View.extend({
  template: JST['invoices/index'],
  
  render: function() {
    var renderedContent = this.template({
      invoices: this.collection
    });
    this.$el.html(renderedContent)
    return this;
  }
})