class CreateHours < ActiveRecord::Migration
  def change
    create_table :hours do |t|
      t.boolean :invoiced, default: false, index: true
      t.references :deliverable, index: true

      t.timestamps
    end
  end
end
