window.onload = function(){

    let data = {
        conectado : "NO",
        userData: {}
    }

    var model = {
        //si no estÃ¡ inicializado el localstorage lo arrancas
        init: function() {
            
        },
        login: function(info) {
            axios({
                method: 'get',
                url: 'http://labs.iam.cat/~aperezh/valida.php',
                params: {
                'user':  info.u,
                'pass' : info.p
                }
            }).then(function (response) {
            console.log(response.data)
            if (response.data.status =="ok"){
                    data.conectado="SI"
                    data.userData.name=response.data.name
                    data.userData.pic=response.data.pic
                    
                    return true
            } 
            else{
                    alert("ERROR")
                    return false
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
    };


    var controller = {
        
        init: function() {
            model.init();
            view.init();
        },
        logout: function(){
            data.conectado="NO"
            view.logout();
        },
        login: function(){
            let info=view.getLoginInfo();
            model.login(info);

        }
    };


    var view = {
        init: function() {
            document.getElementById("login").addEventListener("click", controller.login);
            document.getElementById("logout").addEventListener("click", controller.logout);
        
        
            view.render();
        },
        render: function(){
        },
        logout: function (){
            document.getElementById("panelLogout").style.display="none"
            document.getElementById("panelLogin").style.display="block"
            
        },
        getLoginInfo : function (){

            let u = document.getElementById("inputUser").value
            let p = document.getElementById("inputPassword").value

            return [u,p]
            
        },
        login : function (){

            document.getElementById("profilePic").src =     data.userData.pic
            document.getElementById("profileName").innerHTML =     data.userData.name
            document.getElementById("panelLogout").style.display="block"
            document.getElementById("panelLogin").style.display="none"
            
            }

            
    };

    controller.init();



}