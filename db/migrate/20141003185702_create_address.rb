class CreateAddress < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.string :street_1, null: false
      t.string :street_2
      t.string :city, null: false
      t.string :state, limit: 2, null: false
      t.string :zip, null: false
      t.integer :addressable_id, null: false
      t.string :addressable_type, null: false
      
      t.timestamps
    end
    
    add_index :addresses, [:addressable_id, :addressable_type]
  end
end
