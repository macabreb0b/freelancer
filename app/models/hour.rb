# == Schema Information
#
# Table name: hours
#
#  id             :integer          not null, primary key
#  deliverable_id :integer
#  created_at     :datetime
#  updated_at     :datetime
#  invoice_id     :integer
#

class Hour < ActiveRecord::Base
  validates :deliverable, :presence => true
  
  belongs_to :deliverable
  belongs_to :invoice

end
