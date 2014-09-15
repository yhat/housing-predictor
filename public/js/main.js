$(document).ready(function(){

    // var showInputEl = document.getElementById("gbtn");

    // showInputEl.addEventListener("click", function(e) {
    // var description = document.getElementsByClassName("table table-striped")[0];
    // description.className = e.target.clicked ? "description expanded" : "description hidden";

    if ($("#predicted_price").length) {
        var monies = accounting.formatMoney($("#predicted_price").text());
        $("#predicted_price").text(monies);
    }

    $("#gbtn").click(function(){
        $("#show-table").toggleClass("hidden");
    }

});
