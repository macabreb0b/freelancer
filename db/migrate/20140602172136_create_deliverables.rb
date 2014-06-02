class CreateDeliverables < ActiveRecord::Migration
  def change
    create_table :deliverables do |t|
      t.references :project, index: true, null: false
      t.string :name, null: false
      t.boolean :completed, index: true, null: false
      t.integer :hourly
      t.references :parent_deliverable, index: true

      t.timestamps
    end
  end
end
