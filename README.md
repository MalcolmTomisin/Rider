## Design Overview

The central logic is event based, a socket listening in for orders, on the event of an order, an action hydrates global state and the UI component is shown.

other interactions with the API are mostly REST based; updating the API on every action a rider makes. To maintain consistent state with Backend every call to the backend that "edits" an order status is followed up by a call to the basket api to update global state of the rider app.

All controllers are redux actions, please study them. Appropriate comments are made in context of use. Functions that make events happened are also commented on in the respective contexts. 

The UI structure is atomic in design; Folders in screens represent screens that are related contextually. Please refer to UI design for a holistic context.

## Note
Create/Sign up flow are deprecated currently. Rider sign up happens outside of Application


