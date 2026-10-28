<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VariableScopeController extends Controller
{

    private $course = "BSIT";

    public function index()
    {

        $student = "RENZ";
        $message = "Hello, World!, $student";
       
        return response()->json([
            'student' => $student,
            'message' => $message,
             'course' => $this->course,

        ]);
    }

    public function read()
    {
        $greetingsName = $this->greet("Renz");
        return response()->json([
            'course' => $this->course,
            'greeting' => $greetingsName,
        ]);
    }

    public function greet($name)
    {
        return response()->json([
            'message' => "Hello, $name!",
        ]);
    }

}
