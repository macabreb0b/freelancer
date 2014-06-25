# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  client_id   :integer          not null
#  name        :string(255)      not null
#  open        :boolean
#  description :text
#  created_at  :datetime
#  updated_at  :datetime
#

class Project < ActiveRecord::Base
  validates :user, :client, :name, :hourly, presence: true
  validates :open, :inclusion => { in: [true, false] }

  belongs_to :user
  
  belongs_to :client
  
  has_many :deliverables, -> { order 'rank ASC' }, 
        dependent: :destroy, 
        inverse_of: :project
        
  has_many :hours, 
        through: :deliverables
        
  has_many :invoices
  
  def total_hours
    self.hours.count
  end
  
  def uninvoiced_hours
    self.hours.where(:invoice_id => nil)
  end
  
  def uninvoiced_hours_count
    uninvoiced_hours.count
  end
  
  def children
    deliverables.where(:parent_deliverable_id => nil)
  end
  
  def invoice!
    begin
      invoice = Invoice.create({ paid: false, project_id: id, date: Time.now })
      uninvoiced_hours.update_all(invoice_id: invoice.id)
    rescue
      false
    else
      invoice
    end
  end
end
