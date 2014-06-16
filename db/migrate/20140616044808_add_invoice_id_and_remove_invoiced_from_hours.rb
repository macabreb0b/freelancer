class AddInvoiceIdAndRemoveInvoicedFromHours < ActiveRecord::Migration
  def change
    remove_column :hours, :invoiced
    
    add_column :hours, :invoice_id, :integer, 
          :default => nil, :index => true
  end
end
