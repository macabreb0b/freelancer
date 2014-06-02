# == Schema Information
#
# Table name: clients
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  company    :string(255)
#  user_id    :integer
#  phone      :string(255)
#  email      :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Client < ActiveRecord::Base
  validates :name, :user, presence: true
  
  belongs_to :user
  has_many :projects, inverse_of: :client
end
