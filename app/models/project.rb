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
  belongs_to :user
  belongs_to :client
  
  validates :user, :client, :name, :open, presence: true
end
