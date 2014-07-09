module Api
  class DeliverablesController < ApplicationController
    def index
      @project = Project.find(params[:project_id])
      @deliverables = @project.deliverables
      render 'index'
    end
    
    def show
      @deliverable = Deliverable.includes(:hours).find(params[:id])
      render 'show'
    end
    
    def destroy
      @deliverable = Deliverable.find(params[:id])
      
      unless @deliverable.has_completed_children?
        @deliverable.destroy
        render json: {}
      else
        render json: @deliverable, status: 422
      end
    end
    
    def update
      @deliverable = Deliverable.find(params[:id])

      if @deliverable.update_attributes(deliverable_params)
        render json: @deliverable, status: 200
      else
        render json: @deliverable.errors.full_messages, status: 422
      end
    end
    
    def add_hour
      @deliverable = Deliverable.find(params[:id])
      hour = Hour.new
      @deliverable.hours << hour
      
      if @deliverable.save
        render json: hour
      else
        render json: @deliverable.errors.full_messages, status: 422
      end
    end
    
    def remove_hour
      @deliverable = Deliverable.find(params[:id])
      hour = @deliverable.hours.where(:invoiced  => false).last
      if hour
        hour.destroy
        render json: {}
      else
        render json: @deliverable, status: 400
      end
    end
    
    def create
      @project = Project.find(params[:project_id])
      @deliverable = Deliverable.new(deliverable_params)
      @deliverable.project = @project
      
      if @deliverable.save
        render json: @deliverable, status: 200
      else
        render json: @deliverable.errors.full_messages, status: 422
      end
    end
    
    private
      def deliverable_params
        params.require(:deliverable)
              .permit(:name, :hourly, :completed, 
              :parent_deliverable_id, :project_id, 
              :rank, :collapsed, :description)
      end
  end
end