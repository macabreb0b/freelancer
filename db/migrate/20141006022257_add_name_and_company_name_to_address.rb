class AddNameAndCompanyNameToAddress < ActiveRecord::Migration
  def change
    add_column :addresses, :name, :string
    add_column :addresses, :company_name, :string
  end
end
