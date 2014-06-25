class AddHourlyToProject < ActiveRecord::Migration
  def change
    add_column :projects, :hourly, :integer, :default => 0, null: false
  end
end
