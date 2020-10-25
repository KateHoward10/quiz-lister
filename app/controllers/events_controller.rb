class EventsController < ApplicationController
  before_action :set_quiz
  before_action :authenticate_user!
  before_action :require_quiz_owner!, except: [:toggle_attending]

  def index
  end

  def create
    @event = @quiz.events.create(event_params)
    if @event.valid?
      @event.save
      render :index, status: :created
    else
      flash.now[:error] = @event.errors.full_messages.join(" ")
      render :index, status: :unprocessable_entity
    end
  end

  def destroy
    @quiz.events.find(params[:id]).destroy
  end

  def toggle_attending
    @event = Event.find(params[:id])
    if @event.in?(current_user.events)
      @event.attendees.find_by!(user_id: current_user.id).destroy
    else
      @event.attendees.create(event_id: @event.id, user_id: current_user.id)
    end
  end

  private
    def set_quiz
      @quiz = Quiz.find_by!(slug: params[:quiz_slug])
    end

    def require_quiz_owner!
      if !current_user.try(:admin?) && current_user != @quiz.user
        redirect_to @quiz
        flash[:alert] = "You can only update events for your own quizzes."
      end
    end

    def event_params
      params.require(:event).permit(:date, :description)
    end
end
