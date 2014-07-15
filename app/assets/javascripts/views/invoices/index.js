/*global Freelancer, Backbone, JST, _ */

Freelancer.Views.InvoicesIndex = Backbone.View.extend({
  initialize: function() {
    this.listenTo(Freelancer.Collections.projects, 'sync', this.render);
    this.listenTo(this.collection, 'sort', this.render);
    
    this.collection.sort();
    this.sortedBy = 'id';
    this.reverse = false;
  },
  
  events: {
    'click .sort-id': 'sortById',
    'click .sort-project': 'sortByProject',
    'click .sort-date': 'sortByDate',
    'click .sort-paid': 'sortByPaid',
    'click .sort-total': 'sortByTotal'
  },
  
  template: JST['invoices/index'],
  
  checkReverse: function(comparator) {
    if(comparator === this.sortedBy) {
      this.reverse = !this.reverse;
    } else {
      this.reverse = false;
    }
  },
  
  highlightSortIcon: function() {
    var icons = this.$el.find('.sort-col');
    icons.removeClass('sort-selected');
    icons.filter('.sort-' + this.sortedBy).addClass('sort-selected');
  },
  
  render: function() {
    var renderedContent = this.template({
      invoices: this.collection,
      projects: Freelancer.Collections.projects
    });
    this.$el.html(renderedContent);
    this.highlightSortIcon();
    return this;
  },
  
  sortByDate: function(event) {
    event.preventDefault();
    this.checkReverse('date');
    var view = this;
    
    this.collection.models = 
          _.sortBy(this.collection.models, function(model) {
      if(view.reverse) {
        return new Date(model.get('date'));
      } else {
        return new Date(model.escape('date')) * -1;
      }
    });
    
    this.sortedBy = 'date';
    this.collection.trigger('sort');
  },
  
  sortById: function(event) {
    event.preventDefault();
    this.checkReverse('id');
    var view = this;
    
    this.collection.models = 
          _.sortBy(this.collection.models, function(model) {
      if(view.reverse) {
        return model.id;
      } else {
        return -model.id;
      }
    });
    
    this.sortedBy = 'id';
    this.collection.trigger('sort');
  },
  
  sortByPaid: function(event) {
    event.preventDefault();
    this.checkReverse('paid');
    var view = this;

    this.collection.models = 
          _.sortBy(this.collection.models, function(model) {
      if(view.reverse) {
        if(model.get('paid')) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if(model.get('paid')) {
          return -1;
        } else {
          return 1;
        }
      }
    });

    this.sortedBy = 'paid';
    this.collection.trigger('sort');    
  },
  
  sortByProject: function(event) {
    event.preventDefault();
    this.checkReverse('project');
    var view = this;
    
    this.collection.models = 
          _.sortBy(this.collection.models, function(model) {
      var project = Freelancer.Collections.projects
            .get(model.get('project_id'));
      str = project.get('name').split('');
      
      var multiplier = 1;
      if(view.reverse) {
        multiplier = -1;
      }
      
      str = str.map(function(letter) {
        return String.fromCharCode(letter.charCodeAt(0) * multiplier);
      });
      return str;
    });
    
    this.sortedBy = 'project';
    this.collection.trigger('sort');    
  },
  
  sortByTotal: function(event) {
    event.preventDefault();
    this.checkReverse('total');
    var view = this;
    
    this.collection.models = 
          _.sortBy(this.collection.models, function(model) {
      if(view.reverse) {
        return model.total();
      } else {
        return -model.total();
      }
    });
    
    this.sortedBy = 'total';
    this.collection.trigger('sort');
  }
  
});