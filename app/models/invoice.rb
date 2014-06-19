# == Schema Information
#
# Table name: invoices
#
#  id         :integer          not null, primary key
#  project_id :integer          not null
#  date       :datetime         not null
#  paid       :boolean          not null
#  created_at :datetime
#  updated_at :datetime
#

class Invoice < ActiveRecord::Base
  validates :date, :project, :presence => true
  validates :paid, inclusion: { in: [true, false] }
  
  belongs_to :project
  has_one :client, through: :project
  has_one :user, through: :project
  
  has_many :hours
end
