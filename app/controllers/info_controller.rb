class InfoController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:upload_image]
  before_action :auth_access_token_required, only: [:upload_image]

 def upload_image
    options = {}
    options.merge!(encode_file_for_params({photo: params[:file][0]})) if params[:file].present?
    options.merge!({encode: false})
    # response = DesidimeAuthAdapter.post_data("/v4/image/upload", options, auth_access_token)
    # if response && response.code == 201
    #   result = {"file" => {"url" =>  response["image_urls"]["original"], "id" => response["image_urls"]["original"]}  }
    #   render json: result, status: 200
    # else
    #   render json: {}, status: response.code
    # end  
    result = {"file" => {"url" =>  "https://cdnstaging.desidime.com/attachments/photos/5967/original/1234.jpg?1599575275
", "id" => "https://cdnstaging.desidime.com/attachments/photos/5967/original/1234.jpg?1599575275
"}  }
    render json: result, status: 200
  end

end
