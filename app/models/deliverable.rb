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
#  rank                  :integer          not null
#  collapsed             :boolean          default(FALSE)
#

class Deliverable < ActiveRecord::Base
  validates :project, :name, :rank, :presence => true
  validates :completed, :inclusion => { in: [true, false] }
  before_validation :set_defaults
  
  belongs_to :project,
        inverse_of: :deliverables
  
  belongs_to :parent_deliverable,
        primary_key: :id,
        foreign_key: :parent_deliverable_id,
        class_name: "Deliverable"
    
  has_many :children,
        primary_key: :id,
        foreign_key: :parent_deliverable_id,
        class_name: "Deliverable",
        dependent: :destroy
    
  has_many :hours, 
        dependent: :destroy
        


  def count_by_invoice(id)
    hours.where("hours.invoice_id = ?", id).count
  end
    
  def all_children
    kids = self.children.map { |child| }
    self.children.each { |child| kids += child.all_children }
    kids
  end
  
  def has_completed_children?
    completed || all_children.any?(&:completed)
  end
  
  
  private
    
    def set_defaults
      set_default_hourly && 
          incomplete_by_default && 
          last_rank_by_default
    end
    
    def set_default_hourly
      self.hourly = self.project.hourly if self.hourly.nil?
      true
    end
    
    def incomplete_by_default
      self.completed = false if self.completed.nil?
      true # will not pass validation if it returns falsy value
    end
  
    def last_rank_by_default
      if self.rank.nil?
        if self.parent_deliverable
          self.rank = self.parent_deliverable.children.count
        else
          self.rank = self.project.children.count
        end
      end
      true # will not pass validation if it returns falsy value
    end
end

