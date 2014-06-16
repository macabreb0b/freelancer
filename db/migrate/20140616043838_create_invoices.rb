class CreateInvoices < ActiveRecord::Migration
  def change
    create_table :invoices do |t|
      t.references :project, null: false, index: true
      t.datetime :date, null: false
      t.boolean :paid, null: false

      t.timestamps
    end
  end
end
