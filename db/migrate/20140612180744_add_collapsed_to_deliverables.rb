class AddCollapsedToDeliverables < ActiveRecord::Migration
  def change
    add_column :deliverables, :collapsed, :boolean, :default => false
  end
end
