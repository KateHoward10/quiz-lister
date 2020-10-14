class UsersController < ApplicationController
  before_action :require_admin!

  def index
    @users = User.all
  end

  private

  def require_admin!
    if !current_user.try(:admin?)
      redirect_to quizzes_path
      flash[:alert] = "You are not authorised to perform this action."
    end
  end
end