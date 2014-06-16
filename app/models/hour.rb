class Hour < ActiveRecord::Base
  validates :deliverable, :presence => true
  validates :invoiced, :inclusion => { in: [true, false] }
  belongs_to :deliverable

  before_validation :not_invoiced_by_default

  def not_invoiced_by_default
    self.invoiced = false if self.invoiced.nil?
    true
  end
end
