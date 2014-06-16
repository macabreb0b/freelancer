class Hour < ActiveRecord::Base
  validates :deliverable, :presence => true
  
  belongs_to :deliverable
  belongs_to :invoice

end
