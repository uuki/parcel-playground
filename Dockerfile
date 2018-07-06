FROM 8code/nginx1_13

COPY ./ /var/www/html

# RUN sudo mkdir /var/nodes
# RUN sudo mkdir /var/nodes/easyrtc