# == Schema Information
#
# Table name: invoices
#
#  id                :integer          not null, primary key
#  project_id        :integer          not null
#  date              :datetime         not null
#  paid              :boolean          not null
#  created_at        :datetime
#  updated_at        :datetime
#  number            :integer
#  client_address_id :integer
#  user_address_id   :integer
#

class Invoice < ActiveRecord::Base
  validates :date, :project, :number, :presence => true
  validates :paid, inclusion: { in: [true, false] }
  before_validation :increment_number_of_previous_invoice
  
  belongs_to :project
  has_one :client, through: :project
  has_one :user, through: :project
  
  has_many :hours
  has_many :deliverables, -> { uniq }, through: :hours
  
  belongs_to :user_address,
    foreign_key: :user_address_id, 
    class_name: "Address",
    primary_key: :id
    
  belongs_to :client_address,
    foreign_key: :client_address_id,
    class_name: "Address",
    primary_key: :id
  
  # TODO: remove these in favor of client fetch on invoice#show
  def client_name
    client.name
  end
  
  def client_email
    client.email
  end
  
  def client_phone
    client.phone
  end
  
  def client_id
    client.id
  end
  
  private 
    def increment_number_of_previous_invoice
      last_invoice = user.invoices.last
    
      if !!last_invoice
        self.number ||= last_invoice.number + 1
      else
        self.number ||= 1
      end
    end
end
