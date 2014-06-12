class AddRankToDeliverable < ActiveRecord::Migration
  def change
    add_column :deliverables, :rank, :integer, null: false
  end
end
