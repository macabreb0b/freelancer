class Invoice < ActiveRecord::Base
  belongs_to :project
  has_one :client, through: :project
  has_one :user, through: :project
  
  has_many :hours
end
