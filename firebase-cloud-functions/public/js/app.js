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
