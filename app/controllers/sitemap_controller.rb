class SitemapController < ApplicationController
  def index
    @host = "#{request.protocol}#{request.host}"
    @quizzes = Quiz.all
    
    respond_to do |format|
      format.xml
    end
  end
end