class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.string :name, null: false
      t.string :company
      t.references :user, index: true
      t.string :phone
      t.string :email

      t.timestamps
    end
  end
end
