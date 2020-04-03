//connects to firesotre
var firestore = firebase.firestore();
//references the user documents within the ilearn collection
const docRef = firestore.collection("ilearn").doc("users");
//const emailinput = "test123@gmail.com";
//making sure we are able to write to the console
//console.log("I am going to save" + emailinput + "to Firestore");

//setting the document referenced (users) to have a field email that is the value of 
/*docRef.set({
  email: emailinput
}).then(function(){
  console.log("Status saved!");
}).catch(function(error){
  console.log("Got an error:" + error);
});*/

//getting the data and displaying it to the console


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
      document.getElementById("homepage_div").style.display = "none";
      document.getElementById("createuser_div").style.display = "none";

      var user = firebase.auth().currentUser;
      var userId = user.uid;
      const docRef = firestore.collection("ilearn").doc("users");


      docRef.set({
        user: userId
      }).then(function(){
        console.log("Status saved!");
      }).catch(function(error){
        console.log("Got an error:" + error);
      });

      if(user !=null){
          var email_id = user.email;
          document.getElementById("user_para").innerHTML = "Welcome " +  email_id;
      }
    } else {
      // No user is signed in.
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
      document.getElementById("homepage_div").style.display = "none";
      document.getElementById("createuser_div").style.display = "none";
    }
  });



function login(){
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
   // var user = firebase.auth().currentUser;
    //var userId = user.uid;
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error!" +" "+ errorMessage);
      });
    

}
function createaccount(){
  document.getElementById("createuser_div").style.display = "block";
  document.getElementById("user_div").style.display = "none";
  document.getElementById("login_div").style.display = "none";
  document.getElementById("homepage_div").style.display = "none";


}
function createuser(){
    var newuserEmail = document.getElementById("new_email_field").value;
    var newuserPass = document.getElementById("new_password_field").value;
    firebase.auth().createUserWithEmailAndPassword(newuserEmail, newuserPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}
function logout(){
    firebase.auth().signOut();
    document.getElementById("email_field").value = '';
    document.getElementById("password_field").value ='';
    
}

function homepage(){
      var user = firebase.auth().currentUser;
      var userId = user.uid;
      const docRef = firestore.collection("ilearn").doc("users").collection(userId).doc(userId);
      document.getElementById("homepage_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
      document.getElementById("user_div").style.display = "none";

      docRef.get().then(function(doc){
        if(doc && doc.exists){
          const myData = doc.data();
          var courses = myData.Course1;
          document.getElementById("homepage_para").innerHTML = "Here are your courses: " +  "<br>" + myData.Course1 + "<br> " + myData.Course2+ "<br> " + myData.Course3+ "<br> " + myData.Course4+ "<br> " + myData.Course5;
          
        }
        
      }).catch(function(error){
        console.log("Got an error:" + error);
      });
}
