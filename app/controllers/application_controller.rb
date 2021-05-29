class ApplicationController < ActionController::Base
  before_action :redirect_root_domain
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
    devise_parameter_sanitizer.permit(:account_update, keys: [:username])
  end

  private

  def redirect_root_domain
    return unless request.host === 'brizquizlist.co.uk'
    redirect_to("#{request.protocol}#{ENV['HOST_URL']}#{request.fullpath}", status: 301)
  end
end
