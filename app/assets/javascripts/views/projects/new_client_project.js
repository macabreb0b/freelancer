Freelancer.Views.NewClientProject = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render)
  },
  
  template: JST['projects/_form'],
  
  render: function() {
    var renderedContent = this.template({
      project: new Freelancer.Models.Project({
        client_id: this.client_id
      }),
      client: this.collection.get(this.client_id),
      clients: this.collection
    })
    this.$el.html(renderedContent);
    return this;
  }
})