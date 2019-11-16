class PostsController < ApplicationController

  def index
    @posts = Post.includes(:user).order("created_at DESC").page(params[:page]).per(10)
    @topthree = Post.includes(:user).order("time ASC").limit(3)
  end

  def new
    @post = Post.new
  end
  
  def create
    Post.create(record_params)
    redirect_to root_path
  end
  
  
  private
  def record_params
    params.require(:post).permit(:time, :text).merge(user_id: current_user.id)
  end
end
