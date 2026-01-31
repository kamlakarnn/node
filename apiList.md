


# profilrRouter
- GET /profile/view
- patch /profile/edit
- patch /profile/password


# connection requestRouter
- post /request/send /intereted/:userId
- post /request/send/ignored/:userId
- post /request/review/rejected/:requestId
- post /request/review/accepted/:requestId

- post /request/send/:status/:requestId
- post /request/review/:status/:requestId

# userRouter
-post /user/connection
-get  /user/requestId
-get /user/feed - gets you the profiles of other users on platform

Status: ignore, interested, accepted, rejected
