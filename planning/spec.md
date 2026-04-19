# Problem Statement

It is a Very tideous job to use ollama models without any GUI and it is not user friendly. 

# Solution

I Want To Build A Web Application That Will Have A Chat Interface To Interact With The LLM.

# Functional Requirements

1. I Need A Frontend Which Will Have A Chatbox To Ask Questions To The LLM
2. It Will Be An AI Powered Application Which Will Use LLM To Answer The Questions.
3. I Will Need A Backend Endpoint To Handle The Requests From The Frontend And Send The Responses To The Frontend.
4. Frontend Will Submit A Post Request To The Backend Endpoint With The URL Of The Webpage.
5. LLM Will Process The Request And Return The Response To The Backend.
6. Backend Will Send The Response To The Frontend.
7. Frontend Will Display The Response To The User.
8. The Chat History Will Be Saved In The Local Storage Of The Browser.
9. Thinking Of The Model Will Be Shown In A Scratchpad.

# Constraints

 1. The WebApp Must Handle The Errors Caused By The Backend During Sending And Fetching Of The Data From The LLM. (if any)
 2. We Must Track Every Major Progress In The Development Process And Commit The Code To The Git Repository.

# Edge Cases & Error Hadeling

 1. If The Frontend Is Not Able To Send The Request To The Backend? (if any)
 2. If The Frontend Is Not Able To Receive The Response From The Backend? (if any)
 3. If The Frontend Is Not Able To Display The Response To The User? (if any)
 4. If The Frontend Is Not Able To Save The Chat History To The Local Storage? (if any)
  Then Return An Error Message To The User Describing The Error.
