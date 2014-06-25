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
  
  before_destroy :must_not_have_invoice_id
  
  def must_not_have_invoice_id
    invoice_id.nil?
  end
end
