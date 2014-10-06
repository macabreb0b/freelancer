module Api
  class AddressesController < ApplicationController
    def index
      @addresses = current_user.addresses
      render json: @addresses
    end
  
    def create 
      @address = current_user.addresses.build(address_params)
    
      if @address.save
        render json: @address
      else
        render json: @address.errors.full_messages, status: 422
      end
    end
  end
end