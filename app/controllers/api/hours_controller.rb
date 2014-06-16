module Api
  class HoursController < ApplicationController
    def destroy
      @hour = Hour.find(params[:id])
      unless @hour.invoiced
        @hour.destroy
        render json: {}
      else
        render json: @hour, status: 422
      end
    end
  end
end