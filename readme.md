Documentation on how to send notification details to firebase
==============================================================
Required Fields Sent through FormData
=====================================

title: String, 
==============
This is the title of the post you want to send

body: String
==============
This is the description of the post you want to send

server_token: String
=======================
This is the server  token

reciever_token: String
=======================
This is the recievers token, which is the devise token

EndPoint Details
================
POST with formData to = http://localhost:3500/api/send_notification

