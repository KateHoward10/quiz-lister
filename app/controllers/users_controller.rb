class UsersController < ApplicationController
  before_action :require_admin!

  def index
    @users = User.all
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_path, notice: "User was successfully deleted." }
      format.json { head :no_content }
    end
  end

  private

  def require_admin!
    if !current_user.try(:admin?)
      redirect_to quizzes_path
      flash[:alert] = "You are not authorised to perform this action."
    end
  end
end
