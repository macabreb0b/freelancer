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
  has_many :deliverables, -> { uniq }, through: :hours
  
  def client_name
    client.name
  end
  
  def client_email
    client.email
  end
  
  def client_phone
    client.phone
  end
end
