data = {
    conectado : "NO",
    userData: {}
}


logout= function (){
    document.getElementById("panelLogout").style.display="none"
    document.getElementById("panelLogin").style.display="block"
    data.conectado="NO"
}

login = function (){

let u = document.getElementById("inputUser").value
let p = document.getElementById("inputPassword").value

axios({
    method: 'get',
    url: 'http://labs.iam.cat/~aperezh/valida.php',
    params: {
      'user':  u,
      'pass' : p
    }
  }).then(function (response) {
   console.log(response.data)
   if (response.data.status =="ok"){
        data.conectado="SI"
        data.userData.name=response.data.name
        data.userData.pic=response.data.pic
        
        document.getElementById("profilePic").src =     data.userData.pic
        document.getElementById("profileName").innerHTML =     data.userData.name
        document.getElementById("panelLogout").style.display="block"
        document.getElementById("panelLogin").style.display="none"
   } 
   else{
        alert("ERROR")
   } 
    
    
})
.catch(function (error) {
    // handle error
   // console.log(error);
})
.finally(function () {
    // always executed
    //document.getElementById("espera").innerHTML=``
});
  

}

window.onload = function(){


    this.document.getElementById("login").addEventListener("click", login);
    this.document.getElementById("logout").addEventListener("click", logout);



}