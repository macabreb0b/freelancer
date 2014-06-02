# == Schema Information
#
# Table name: deliverables
#
#  id                    :integer          not null, primary key
#  project_id            :integer          not null
#  name                  :string(255)      not null
#  completed             :boolean          not null
#  hourly                :integer
#  parent_deliverable_id :integer
#  created_at            :datetime
#  updated_at            :datetime
#

class Deliverable < ActiveRecord::Base
  validates :project, :name, :presence => true
  validates :completed, :inclusion => { in: [true, false] }
  before_validation :incomplete_by_default
  
  belongs_to :project
  
  belongs_to :parent_deliverable,
    primary_key: :id,
    foreign_key: :parent_deliverable_id,
    class_name: "Deliverable"
    
  has_many :children,
    primary_key: :id,
    foreign_key: :parent_deliverable_id,
    class_name: "Deliverable"
    
  
  def incomplete_by_default
    self.completed = false if self.completed.nil?
    true # will not pass validation if it returns falsy value
  end
end
