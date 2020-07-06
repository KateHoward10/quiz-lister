class RegistrationsController < Devise::RegistrationsController

  protected

  def update_resource(resource, user_params)
    resource.update_without_password(user_params)
  end

  private
    def user_params
      params.require(:user).permit(:email, :username, :password)
    end
end