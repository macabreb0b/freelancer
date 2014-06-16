module Api
  class ProjectsController < ApplicationController
    def index
      @projects = Project.includes(:deliverables)
            .includes(:hours)
            .where(:user_id => current_user.id)

      render 'index.json.jbuilder'
    end
    
    def show
      @project = Project.includes(:deliverables)
            .includes(:hours).find(params[:id])
      render 'show.json.jbuilder'
    end
    
    def create
      @project = Project.new(project_params)
      client = Client.find(params[:client_id])
      client.projects << @project
      @project.user = current_user
      
      if @project.save
        render json: @project, status: 200
      else
        render json: @project.errors.full_messages, status: 422
      end
    end
    
    def destroy
      @project = Project.find(params[:id])
      @project.destroy
      render json: {}
    end
    
    def update
      @project = Project.find(params[:id])

      if @project.update_attributes(project_params)
        render json: @project, status: 200
      else
        render json: @project.errors.full_messages, status: 422
      end
    end

    private
      def project_params
        params.require(:project).permit(:name, :description, :open, :client_id)
      end
  end
end