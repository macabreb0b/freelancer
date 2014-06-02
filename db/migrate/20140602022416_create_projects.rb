class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.references :user, index: true, null: false
      t.references :client, index: true, null: false
      t.string :name, index: true, null: false
      t.boolean :open
      t.text :description

      t.timestamps
    end
  end
end
