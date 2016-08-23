var appControllers = angular.module('appControllers', ['ngCookies']);

var csrf_token = $('meta[name="csrf-token"]').attr('content');

//login controller for login.html
appControllers.controller('LoginController', ['$scope', '$cookieStore', '$location', '$http', function ($scope, $cookieStore, $location, $http) { 
	 if($cookieStore.get('email') != undefined){ // redirect to dashboard route if user already logged in and stored a cookie
		$location.path( "/dashboard" );
	 }
	$scope.pageClass = 'page-login';
	$scope.loginstat = '';
	$scope.login = function() { // login function upon submit form data in the login.html
		var url = '/surepulse_exam/public/auth'; // laravel controller path
	    $http.post(url, 
	      {
	        email: $scope.email,
	        password: $scope.password
	      })
	      .success(function(response) {
	      	console.log(response);
	        //$scope.success = '';
			if(response == 0){
				$scope.loginstat = 'Incorrect Email or password'; // status error upon logging in
				console.log($scope.loginstat);
				$scope.email = null;
				$scope.password = null;
			}else{
			  $cookieStore.put('email', response.email); // stored cookie if login successful
			  $cookieStore.put('id', response.id);
			  $cookieStore.put('firstname', response.firstname);
			  $cookieStore.put('lastname', response.lastname);
			  $location.path( "/dashboard" ); // redirect to dashboard route
			 }
			  
	      })
	      .error(function(response) {
	        console.log(response);
	      });
    };
}]);

//register controller for register.html
appControllers.controller('RegisterController', ['$scope', '$cookieStore', '$location',  '$http', function ($scope, $cookieStore, $location,  $http) {
	 if($cookieStore.get('email') != undefined){ // redirect to dashboard route if user already logged in and stored a cookie
		$location.path( "/dashboard" );
	 }
	$scope.pageClass = 'page-register';
	$scope.register = function() { // register function upon submit form data in the register.html
		var url = '/surepulse_exam/public/users'; //laravel controller path
	    $http.post(url, 
	      {
	        firstname: $scope.firstname, // input datas from ng-model
	        lastname: $scope.lastname,
	        email: $scope.email,
	        password: $scope.password,
	        password_confirmation: $scope.password_confirmation

	      })
	      .success(function(response) {
	        $scope.accounts = response;
	        $scope.success = '';
			
			if(response.success == undefined) { // if fields is blank, response will be undefined and status from laravel will be passed to the front end
				$scope.email_error = response.email[0];
				$scope.password_error = response.password[0];
				$scope.firstname_error = response.firstname[0];
				$scope.lastname_error = response.lastname[0];
			}
			else{
				alert('Data successfully registered!');
				$location.path( "/login" ); // redirect to the welcome page after a successful registration
			}
	      })
	      .error(function(response) {
	        console.log(response);
	      });
		

    };
}]);

appControllers.controller('MainController', ['$scope', '$cookieStore', '$location', '$http', function ($scope, $cookieStore, $location, $http) {
	 if($cookieStore.get('email') != undefined){ // if user already logged in, welcome page is not accessible, you will be directed to dashboard route for dashboard.html view
		$location.path( "/dashboard" );
	 }
    
}]);

appControllers.controller('DashboardController', ['$scope', '$cookieStore', '$location', '$http', function ($scope, $cookieStore, $location, $http) {
	//console.log($cookieStore.get('email'));
     if($cookieStore.get('email') == undefined){ // redirect to welcome page if user is not logged in
		$location.path( "/" );
	 }
		$scope.logout = function() { // logout function, all the cookie stored during login will be removed
			  $cookieStore.remove('email');
			  $cookieStore.remove('id');
			  $cookieStore.remove('firstname');
			  $cookieStore.remove('lastname');
			  $location.path( "/" ); // redirect again to welcome page
    };
}]);
