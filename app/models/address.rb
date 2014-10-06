# == Schema Information
#
# Table name: addresses
#
#  id               :integer          not null, primary key
#  street_1         :string(255)      not null
#  street_2         :string(255)
#  city             :string(255)      not null
#  state            :string(2)        not null
#  zip              :string(255)      not null
#  addressable_id   :integer          not null
#  addressable_type :string(255)      not null
#  created_at       :datetime
#  updated_at       :datetime
#  name             :string(255)
#  company_name     :string(255)
#

class Address < ActiveRecord::Base
  validates :street_1, :city, :state, :zip, 
        :addressable, :presence => true
        
  belongs_to :addressable, polymorphic: true
end
