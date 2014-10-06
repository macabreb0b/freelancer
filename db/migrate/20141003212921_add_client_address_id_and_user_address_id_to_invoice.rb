class AddClientAddressIdAndUserAddressIdToInvoice < ActiveRecord::Migration
  def change
    add_column :invoices, :client_address_id, :integer
    add_column :invoices, :user_address_id, :integer
  end
end