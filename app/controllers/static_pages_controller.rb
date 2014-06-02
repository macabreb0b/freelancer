class StaticPagesController < ApplicationController
  def root
    if current_user
      render :root
    else
      redirect_to new_user_registration_path
    end
  end
end
