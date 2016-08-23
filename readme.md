Hi this application is for the examination for Surefiresocial.

Create a database for MYSQL named db_surepulse

Setup Guide:
		
		1. Clone or download the repository in your workstation
		
		2. In my case I use xampp for the webserver so I created a folder name surepulse_exam in the htdocs and put the cloned repository inside
		
		3. Open cmd and go to the file path of surepulse_exam and type composer install
		
		4. After a successful install, create a .env file in the root folder of your laravel together with the .env.example file 
		
		copy the contents inside .env.example file inside .env file but change the following data:
		
		database name is 'db_surepulse', 
		
		username is 'root' 
		
		and password is ''
		
		type php artisan key:generate on cmd terminal to generate the app key inside the .env file
		
		5. You can now migrate the tables by typing php artisan migrate on cmd terminal
		
		6. After the migration successful, type php artisan db:seed on cmd terminal for the data seeds
		
		7. After a successful setup, you can now access the application through localhost/surepulse_exam/public
		
		8. The seed data created a default account with an email of 'mikebaccay@gmail.com' and a password of '123456'
		

I have used angular js for frontend and laravel framework for its backend

MASTER VIEW - resources/views/index.blade

ANGULAR FRONTEND : 

public/angular -- js,css , public/partials -- htmls

LARAVEL CONTROLLERS - app/Http/Controllers

I made a login and registration function on this application with simple and neat designs.

Hoping for your positive feedback and result thank you very much and Godbless :)

