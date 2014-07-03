class AddNumberToInvoice < ActiveRecord::Migration
  def up
    add_column :invoices, :number, :integer
    
    User.all.each do |user|
      user.invoices.sort.each_with_index do |invoice, idx|
        invoice.number = idx + 1
        invoice.save!
      end
    end
  end
  
  def down
    remove_column :invoices, :number
  end
end
