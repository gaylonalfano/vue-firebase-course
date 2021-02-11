// Need to grab Add Request button event
// and apply 'open' class to modal background new-request
var addRequestLinkEl = document.querySelector(".add-request");
var modalDivEl = document.querySelector(".new-request");
// ==== Event listeners
// Add class "open" to display modal
addRequestLinkEl.addEventListener("click", function () {
    console.log("Add Request Clicked!");
    // Let's add/toggle the modal by adding/removing "open" class
    // modalDivEl.classList.toggle("open");
    modalDivEl.classList.add("open");
});
// Remove class "open" if click outside of modal
modalDivEl.addEventListener("click", function (e) {
    // console.log("this: ", this); // Window {window: Window, self: Window, ...}
    console.log("modal clicked!");
    // Q: How to fix TS2339 about e.target not having 'classList' prop?
    // A: Type casting e.target as HTMLDivElement!
    if (e.target.classList.contains("new-request")) {
        // The actual modal Div has class="modal", so it won't close when clicked
        modalDivEl.classList.remove("open");
    }
});
// Test out my Callable Cloud Function
var sayHelloButton = document.querySelector(".callable");
sayHelloButton.addEventListener("click", function () {
    // Have it invoke my sayHello() callable
    // Q: How to call the callable? It's not a Request type...
    // A: First need a FB Function reference! We can access it from firebase!
    // A: Typically best to store as same name we gave in functions/index.ts
    // @ts-ignore
    var sayHello = firebase.functions().httpsCallable("sayHello");
    // Now that we have a REFERENCE, we can invoke it right here
    // This is asynchronous, so it's going to return a Promise.
    // Once we get the result/response back from sayHello(), we can access its
    // data via response.data.
    // Q: What Type can we use for the response?
    // A: functions.Response (see my functions/src/index.ts)
    // Q: How to pass data to our callable?
    // A: Simply pass a data object as an argument!
    // A: This now gives us this object to interact with inside our
    // sayHello Cloud function!
    sayHello({ name: "Gaylon" }).then(function (response) {
        console.log(response.data);
    });
});
