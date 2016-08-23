<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\facades\Input;
use App\User;
use Validator;
use Illuminate\Support\Facades\Auth;
use Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        	$rules = array(
			'email'    => 'required|email|unique:users',  // backend validations for every post especially unique email
			'password' => 'required',
			'firstname' => 'required',
			'lastname' => 'required'
		);

		$validator = Validator::make(Input::all(), $rules);
		
		if ($validator->fails()) {
			return $validator->messages()->toJson(); // trigger json fail response
		} else {
			$user = new User; // success registration
			$user->email = Input::get("email");
			$user->firstname = Input::get("firstname");
			$user->lastname = Input::get("lastname");
			$user->password = Hash::make(Input::get("password"));
			$user->save(); 
			return ['success' => true];
		}
    }
	
	public function login(Request $request) // login controller
    {
		$rules = array(
			'email'    => 'required|email', 
			'password' => 'required' 
		);

		$validator = Validator::make(Input::all(), $rules);
	
        if ($validator->fails()) {
			return 0;
		} else {
			// create our user data for the authentication
			$userdata = array(
				'password'  => Input::get('password'),
				'email'     => Input::get('email')
			);

			// attempt to do the login
			if (Auth::attempt(array('email' => Input::get('email'), 'password' => Input::get('password')))) {
				return Auth::user();
			} else {
				// validation not successful, send back to form
				return 0;
			}
		}
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
