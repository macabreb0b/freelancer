class Address < ActiveRecord::Base
  validates :street_1, :city, :state, :zip, 
        :addressable, :presence => true
        
  belongs_to :addressable, polymorphic: true
end